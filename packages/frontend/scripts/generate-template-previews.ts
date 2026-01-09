#!/usr/bin/env tsx
/**
 * Template Preview Generator
 *
 * Generates preview images for all templates by executing their workflows.
 * The template definition is the single source of truth for its preview.
 *
 * Features:
 * - Hash-based caching: only regenerate if template changed
 * - Cost confirmation: prompts before AI generation
 * - Graceful degradation: skips AI templates if no API key
 * - Sequential AI generation with rate limiting
 *
 * Usage:
 *   pnpm generate:previews           # Interactive mode
 *   pnpm generate:previews --yes     # Skip confirmations
 *   pnpm generate:previews --force   # Regenerate all
 *   pnpm generate:previews --dry-run # Show what would be generated
 */

import { createHash } from "crypto";

/**
 * CLI logger using allowed console methods.
 * Uses console.warn for info (stdout-like) and console.error for errors.
 */
const log = {
  info: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
};
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as readline from "readline";

// Types from floimg-templates (inline to avoid complex imports)
interface StudioNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

interface StudioEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  generator: string;
  requiresCloud?: boolean;
  preview?: {
    imageUrl: string;
    width?: number;
    height?: number;
  };
  workflow: {
    nodes: StudioNode[];
    edges: StudioEdge[];
  };
}

// Get script directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Output directory (relative to frontend package)
const OUTPUT_DIR = join(__dirname, "../public/images/templates");

// AI generators that require API keys
const AI_GENERATORS = new Set([
  "openai",
  "openai-images",
  "stability",
  "stability-ai",
  "gemini",
  "gemini-generate",
  "google-imagen",
  "replicate",
]);

// Estimated cost per AI image generation
const AI_COST_PER_IMAGE = 0.15; // $0.15 average

/**
 * Parse command line arguments
 */
function parseArgs(): {
  yes: boolean;
  force: boolean;
  dryRun: boolean;
  help: boolean;
} {
  const args = process.argv.slice(2);
  return {
    yes: args.includes("--yes") || args.includes("-y"),
    force: args.includes("--force") || args.includes("-f"),
    dryRun: args.includes("--dry-run") || args.includes("-n"),
    help: args.includes("--help") || args.includes("-h"),
  };
}

/**
 * Compute hash of template workflow for caching
 */
function computeTemplateHash(template: Template): string {
  const content = JSON.stringify({
    id: template.id,
    workflow: template.workflow,
    generator: template.generator,
  });
  return createHash("sha256").update(content).digest("hex").slice(0, 32); // 128-bit for collision resistance
}

/**
 * Check if template needs regeneration
 */
function needsRegeneration(template: Template, force: boolean): boolean {
  if (force) return true;

  const imagePath = join(OUTPUT_DIR, `${template.id}.png`);
  const hashPath = join(OUTPUT_DIR, `${template.id}.hash`);

  // Check if image exists
  if (!existsSync(imagePath)) return true;

  // Check if hash matches
  if (!existsSync(hashPath)) return true;

  const storedHash = readFileSync(hashPath, "utf8").trim();
  const currentHash = computeTemplateHash(template);

  return storedHash !== currentHash;
}

/**
 * Check if template uses AI generation
 */
function isAITemplate(template: Template): boolean {
  // Check main generator
  if (AI_GENERATORS.has(template.generator)) return true;

  // Check all generator nodes in workflow
  for (const node of template.workflow.nodes) {
    if (node.type === "generator") {
      const generatorName = (node.data as { generatorName?: string }).generatorName;
      if (generatorName && AI_GENERATORS.has(generatorName)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Prompt user for confirmation
 */
async function confirm(message: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${message} [y/N] `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

/**
 * Convert Studio workflow to floimg Pipeline format
 * Simplified version for templates (no input nodes, no dynamic text)
 */
function workflowToPipeline(
  workflow: { nodes: StudioNode[]; edges: StudioEdge[] },
  templateId: string
): { name: string; steps: unknown[] } {
  // Build dependency graph
  const deps = new Map<string, Set<string>>();
  for (const node of workflow.nodes) {
    deps.set(node.id, new Set());
  }
  for (const edge of workflow.edges) {
    const targetDeps = deps.get(edge.target);
    if (targetDeps) {
      targetDeps.add(edge.source);
    }
  }

  // Topological sort
  const completed = new Set<string>();
  const sorted: StudioNode[] = [];

  while (sorted.length < workflow.nodes.length) {
    const ready = workflow.nodes.filter((n) => {
      if (completed.has(n.id)) return false;
      const nodeDeps = deps.get(n.id) || new Set();
      for (const dep of nodeDeps) {
        if (!completed.has(dep)) return false;
      }
      return true;
    });

    if (ready.length === 0) break;

    for (const node of ready) {
      sorted.push(node);
      completed.add(node.id);
    }
  }

  // Convert to pipeline steps
  const nodeToVar = new Map<string, string>();
  const steps: unknown[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const node = sorted[i];
    const varName = `v${i}`;
    nodeToVar.set(node.id, varName);

    // Skip input nodes
    if (node.type === "input") continue;

    if (node.type === "generator") {
      const data = node.data as { generatorName: string; params: Record<string, unknown> };
      steps.push({
        kind: "generate",
        generator: data.generatorName,
        params: data.params,
        out: varName,
      });
    } else if (node.type === "transform") {
      const data = node.data as { operation: string; params: Record<string, unknown> };

      // Find input edge
      const inputEdge = workflow.edges.find(
        (e) => e.target === node.id && (e.targetHandle === "image" || !e.targetHandle)
      );
      const inputVar = inputEdge ? nodeToVar.get(inputEdge.source) : undefined;

      if (inputVar) {
        steps.push({
          kind: "transform",
          op: data.operation, // Pipeline format uses "op", not "operation"
          params: data.params,
          in: inputVar,
          out: varName,
        });
      }
    } else if (node.type === "save") {
      // Skip save nodes for preview generation - we save manually
      continue;
    }
  }

  return { name: templateId, steps };
}

/**
 * Execute a template and save the preview image
 */
async function generatePreview(
  template: Template,
  floimg: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    // Convert workflow to pipeline
    const pipeline = workflowToPipeline(template.workflow, template.id);

    if (pipeline.steps.length === 0) {
      return { success: false, error: "No executable steps in workflow" };
    }

    // Validate client has expected run() method
    if (typeof floimg !== "object" || floimg === null || !("run" in floimg)) {
      return { success: false, error: "FloImg client missing expected run() method" };
    }

    // Execute pipeline
    type ClientType = { run: (p: unknown) => Promise<Array<{ value?: unknown }>> };
    const client = floimg as ClientType;
    const results = await client.run(pipeline);

    // Find the last image result (skip save results)
    // ImageBlob has { bytes: Buffer, mime: string }
    let imageResult: { bytes: Buffer; mime: string } | undefined;
    for (let i = results.length - 1; i >= 0; i--) {
      const result = results[i];
      if (result.value && "bytes" in result.value) {
        imageResult = result.value as { bytes: Buffer; mime: string };
        break;
      }
    }

    if (!imageResult) {
      return { success: false, error: "No image output from pipeline" };
    }

    // Ensure output directory exists
    const outputPath = join(OUTPUT_DIR, `${template.id}.png`);
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Validate PNG image (check magic bytes)
    const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    if (imageResult.mime === "image/png" && !imageResult.bytes.subarray(0, 8).equals(PNG_MAGIC)) {
      return { success: false, error: "Generated image has invalid PNG signature" };
    }

    // Save image
    writeFileSync(outputPath, imageResult.bytes);

    // Save hash for caching
    const hashPath = join(OUTPUT_DIR, `${template.id}.hash`);
    writeFileSync(hashPath, computeTemplateHash(template));

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    // Detect known QR parameter mismatch (floimg-templates uses 'data', plugin expects 'text')
    if (message.includes("QR code") && message.includes("text")) {
      return {
        success: false,
        error: "QR parameter mismatch (template uses 'data', plugin expects 'text')",
      };
    }

    return { success: false, error: message };
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = parseArgs();

  if (args.help) {
    log.info(`
Template Preview Generator

Usage:
  pnpm generate:previews [options]

Options:
  --yes, -y      Skip confirmation prompts
  --force, -f    Regenerate all previews (ignore cache)
  --dry-run, -n  Show what would be generated without executing
  --help, -h     Show this help message

Environment:
  OPENAI_API_KEY     Required for AI template generation
  STABILITY_API_KEY  Required for Stability AI templates
`);
    process.exit(0);
  }

  log.info("🖼️  Template Preview Generator\n");

  // Dynamic import of dependencies
  let templates: Template[];
  let floimg: unknown;

  try {
    const templatesModule = await import("@teamflojo/floimg-templates");
    templates = templatesModule.getAllTemplates();
  } catch (err) {
    log.error("❌ Failed to import @teamflojo/floimg-templates:", err);
    log.error("   Run: pnpm add @teamflojo/floimg-templates");
    process.exit(1);
  }

  // Check which templates need regeneration
  const toGenerate: Template[] = [];
  const aiTemplates: Template[] = [];
  const skipped: Template[] = [];

  for (const template of templates) {
    if (!needsRegeneration(template, args.force)) {
      skipped.push(template);
      continue;
    }

    if (isAITemplate(template)) {
      aiTemplates.push(template);
    } else {
      toGenerate.push(template);
    }
  }

  // Summary
  log.info(`📊 Template Summary:`);
  log.info(`   Total: ${templates.length}`);
  log.info(`   Unchanged (cached): ${skipped.length}`);
  log.info(`   Deterministic to generate: ${toGenerate.length}`);
  log.info(`   AI templates to generate: ${aiTemplates.length}`);
  log.info();

  if (args.dryRun) {
    log.info("🔍 Dry run - would generate:\n");
    for (const t of [...toGenerate, ...aiTemplates]) {
      log.info(`   ${isAITemplate(t) ? "🤖" : "📈"} ${t.id} (${t.generator})`);
    }
    process.exit(0);
  }

  if (toGenerate.length === 0 && aiTemplates.length === 0) {
    log.info("✅ All previews up to date!");
    process.exit(0);
  }

  // Initialize floimg client with plugins
  try {
    log.info("📦 Loading @teamflojo/floimg...");
    const floimgModule = await import("@teamflojo/floimg");
    log.info("   Exports:", Object.keys(floimgModule).join(", "));
    const { FloImg, SharpTransformProvider, FsSaveProvider } = floimgModule;

    log.info("🔧 Creating FloImg client...");
    const client = new FloImg({ verbose: false });
    floimg = client;

    // Register transform and save providers
    client.registerTransformProvider(new SharpTransformProvider());
    client.registerSaveProvider(new FsSaveProvider());

    log.info("\n🔌 Loading plugins...");

    // Try to register optional generators (they are factory functions - call them to get the generator)
    try {
      const quickchartModule = await import("@teamflojo/floimg-quickchart");
      const quickchartFactory = quickchartModule.quickchart || quickchartModule.default;
      client.registerGenerator(quickchartFactory());
      log.info("   ✓ QuickChart generator loaded");
    } catch (e) {
      log.info("   ⚠ QuickChart generator not available:", (e as Error).message);
    }

    try {
      const mermaidModule = await import("@teamflojo/floimg-mermaid");
      const mermaidFactory = mermaidModule.mermaid || mermaidModule.default;
      client.registerGenerator(mermaidFactory());
      log.info("   ✓ Mermaid generator loaded");
    } catch (e) {
      log.info("   ⚠ Mermaid generator not available:", (e as Error).message);
    }

    try {
      const qrModule = await import("@teamflojo/floimg-qr");
      const qrFactory = qrModule.qr || qrModule.default;
      client.registerGenerator(qrFactory());
      log.info("   ✓ QR generator loaded");
    } catch (e) {
      log.info("   ⚠ QR generator not available:", (e as Error).message);
    }

    // Try to register AI generators if API key available
    if (process.env.OPENAI_API_KEY) {
      try {
        const openaiModule = await import("@teamflojo/floimg-openai");
        const openaiFactory =
          openaiModule.openai || openaiModule.openaiImages || openaiModule.default;
        if (openaiFactory) {
          client.registerGenerator(openaiFactory({ apiKey: process.env.OPENAI_API_KEY }));
          log.info("   ✓ OpenAI generator loaded");
        }
      } catch (e) {
        log.info("   ⚠ OpenAI generator not available:", (e as Error).message);
      }
    } else {
      log.info("   ⚠ OpenAI generator skipped (OPENAI_API_KEY not set)");
    }

    log.info();
  } catch (error) {
    log.error("❌ Failed to initialize floimg client");
    log.error("   Error:", error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      log.error("   Stack:", error.stack.split("\n").slice(0, 5).join("\n"));
    }
    process.exit(1);
  }

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate deterministic templates
  if (toGenerate.length > 0) {
    log.info(`\n📈 Generating ${toGenerate.length} deterministic templates...\n`);

    for (const template of toGenerate) {
      process.stdout.write(`   ${template.id}... `);
      const result = await generatePreview(template, floimg);
      if (result.success) {
        log.info("✅");
      } else {
        log.info(`❌ ${result.error}`);
      }
    }
  }

  // Generate AI templates (with confirmation)
  if (aiTemplates.length > 0) {
    const hasApiKey = !!process.env.OPENAI_API_KEY;

    if (!hasApiKey) {
      log.info(`\n⚠️  Skipping ${aiTemplates.length} AI templates (OPENAI_API_KEY not set)`);
    } else {
      const estimatedCost = aiTemplates.length * AI_COST_PER_IMAGE;
      log.info(`\n🤖 AI Templates: ${aiTemplates.length} to generate`);
      log.info(`   Estimated cost: ~$${estimatedCost.toFixed(2)}`);

      let proceed = args.yes;
      if (!proceed) {
        proceed = await confirm(`   Generate ${aiTemplates.length} AI images?`);
      }

      if (proceed) {
        log.info();
        for (const template of aiTemplates) {
          process.stdout.write(`   ${template.id}... `);

          // Rate limiting - wait 1s between AI generations
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const result = await generatePreview(template, floimg);
          if (result.success) {
            log.info("✅");
          } else {
            log.info(`❌ ${result.error}`);
          }
        }
      } else {
        log.info("   Skipped AI templates");
      }
    }
  }

  log.info("\n✨ Preview generation complete!");
  log.info(`   Output: ${OUTPUT_DIR}`);
}

main().catch((error) => {
  log.error("Fatal error:", error);
  process.exit(1);
});
