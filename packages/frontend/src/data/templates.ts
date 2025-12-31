/**
 * Template data for the floimg-web gallery
 *
 * Categories are organized by USE CASE, not generator type:
 * - AI Workflows: AI-powered image generation and processing
 * - Data Viz: Charts, graphs, diagrams, and data visualization
 * - Marketing: Social media, branding, and promotional assets
 * - Utilities: QR codes, screenshots, format conversion, etc.
 *
 * When adding new templates to floimg-studio, add the metadata here too.
 * Template IDs must match for "Open in Studio" links to work.
 */

export interface GalleryTemplate {
  id: string;
  name: string;
  description: string;
  category: "AI Workflows" | "Data Viz" | "Marketing" | "Utilities";
  generator: string;
  tags?: string[];
  preview?: {
    imageUrl: string;
  };
  capabilities?: {
    claudeCodeReady?: boolean;
    studioCompatible?: boolean;
    pipeline?: boolean;
  };
  codeExample?: string;
}

export const templates: GalleryTemplate[] = [
  // ============================================
  // AI Workflows
  // ============================================
  {
    id: "ai-product-shot",
    name: "AI Product Photography",
    description: "Generate professional product images with AI-controlled lighting and backgrounds",
    category: "AI Workflows",
    generator: "openai",
    tags: ["product", "ecommerce", "photography", "dall-e"],
    preview: {
      imageUrl: "/showcase/ai-generation/product-headphones.png",
    },
    capabilities: {
      studioCompatible: true,
    },
    codeExample: `const image = await floimg.generate({
  generator: 'openai',
  params: {
    prompt: 'Professional product photo of headphones on white background',
    size: '1024x1024'
  }
});`,
  },
  {
    id: "ai-hero-image",
    name: "AI Hero Image",
    description: "Create stunning hero images for websites and landing pages",
    category: "AI Workflows",
    generator: "openai",
    tags: ["hero", "landing-page", "marketing", "dall-e"],
    preview: {
      imageUrl: "/showcase/ai-generation/futuristic-city.png",
    },
    capabilities: {
      studioCompatible: true,
    },
    codeExample: `const image = await floimg.generate({
  generator: 'openai',
  params: {
    prompt: 'Futuristic city skyline at sunset, cinematic lighting',
    size: '1792x1024'
  }
});`,
  },
  {
    id: "ai-mascot",
    name: "AI Mascot Generator",
    description: "Design unique mascots and characters for your brand",
    category: "AI Workflows",
    generator: "openai",
    tags: ["mascot", "character", "branding", "dall-e"],
    preview: {
      imageUrl: "/showcase/ai-generation/robot-mascot.png",
    },
    capabilities: {
      studioCompatible: true,
    },
  },

  // ============================================
  // Data Viz
  // ============================================
  {
    id: "revenue-chart",
    name: "Revenue Dashboard",
    description: "Quarterly revenue visualization with gradient bars",
    category: "Data Viz",
    generator: "quickchart",
    tags: ["bar", "revenue", "quarterly", "dashboard"],
    preview: {
      imageUrl: "/showcase/data-viz/quarterly-revenue.png",
    },
    capabilities: {
      studioCompatible: true,
    },
    codeExample: `const chart = await floimg.generate({
  generator: 'quickchart',
  params: {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Revenue ($M)',
        data: [12, 19, 8, 15]
      }]
    }
  }
});`,
  },
  {
    id: "framework-usage",
    name: "Framework Usage Stats",
    description: "Compare framework popularity with horizontal bar chart",
    category: "Data Viz",
    generator: "quickchart",
    tags: ["bar", "comparison", "stats", "horizontal"],
    preview: {
      imageUrl: "/showcase/data-viz/framework-usage.png",
    },
    capabilities: {
      studioCompatible: true,
    },
  },
  {
    id: "monthly-users",
    name: "User Growth Chart",
    description: "Track monthly user growth with line chart",
    category: "Data Viz",
    generator: "quickchart",
    tags: ["line", "growth", "users", "monthly"],
    preview: {
      imageUrl: "/showcase/data-viz/monthly-users.png",
    },
    capabilities: {
      studioCompatible: true,
    },
  },
  {
    id: "traffic-breakdown",
    name: "Traffic by Device",
    description: "Doughnut chart showing traffic sources by device type",
    category: "Data Viz",
    generator: "quickchart",
    tags: ["doughnut", "traffic", "analytics", "pie"],
    preview: {
      imageUrl: "/showcase/data-viz/traffic-by-device.png",
    },
    capabilities: {
      studioCompatible: true,
    },
  },
  {
    id: "api-flow",
    name: "API Request Flow",
    description: "Sequence diagram showing API authentication flow",
    category: "Data Viz",
    generator: "mermaid",
    tags: ["sequence", "api", "authentication", "diagram"],
    capabilities: {
      studioCompatible: true,
    },
  },
  {
    id: "system-architecture",
    name: "System Architecture",
    description: "Microservices architecture diagram",
    category: "Data Viz",
    generator: "mermaid",
    tags: ["architecture", "microservices", "flowchart"],
    capabilities: {
      studioCompatible: true,
    },
  },

  // ============================================
  // Marketing
  // ============================================
  {
    id: "social-media-kit",
    name: "Social Media Kit",
    description: "Generate optimized images for all social platforms from one source",
    category: "Marketing",
    generator: "pipeline",
    tags: ["social", "og-image", "twitter", "instagram"],
    preview: {
      imageUrl: "/showcase/pipelines/output/og-image.png",
    },
    capabilities: {
      studioCompatible: true,
      pipeline: true,
    },
    codeExample: `// One source → all platforms
const socialKit = await floimg.pipeline(heroImage, [
  { op: 'resize', params: { width: 1200, height: 630 }, save: 'og-image.png' },
  { op: 'resize', params: { width: 800, height: 418 }, save: 'twitter-card.png' },
  { op: 'resize', params: { width: 1080, height: 1080 }, save: 'instagram.png' },
]);`,
  },
  {
    id: "avatar-pipeline",
    name: "Avatar Processing",
    description: "Generate consistent avatar sizes with circular crop and optimization",
    category: "Marketing",
    generator: "pipeline",
    tags: ["avatar", "profile", "resize", "crop"],
    preview: {
      imageUrl: "/showcase/pipelines/output/avatar-128.png",
    },
    capabilities: {
      studioCompatible: true,
      pipeline: true,
    },
    codeExample: `const avatars = await floimg.pipeline(photo, [
  { op: 'crop', params: { shape: 'circle' } },
  { op: 'resize', params: { width: 256 }, save: 'avatar-256.png' },
  { op: 'resize', params: { width: 128 }, save: 'avatar-128.png' },
  { op: 'resize', params: { width: 64 }, save: 'avatar-64.png' },
]);`,
  },
  {
    id: "watermark-branding",
    name: "Branded Watermark",
    description: "Add your logo watermark to images automatically",
    category: "Marketing",
    generator: "pipeline",
    tags: ["watermark", "branding", "logo", "protection"],
    preview: {
      imageUrl: "/showcase/pipelines/output/watermark-branded.png",
    },
    capabilities: {
      studioCompatible: true,
      pipeline: true,
    },
  },
  {
    id: "filter-showcase",
    name: "Image Filters",
    description: "Apply artistic filters: vintage, dramatic, vibrant, and more",
    category: "Marketing",
    generator: "pipeline",
    tags: ["filter", "vintage", "effects", "artistic"],
    preview: {
      imageUrl: "/showcase/pipelines/output/filter-vintage.png",
    },
    capabilities: {
      studioCompatible: true,
      pipeline: true,
    },
  },

  // ============================================
  // Utilities
  // ============================================
  {
    id: "branded-qr",
    name: "Branded QR Code",
    description: "QR code with custom colors and styling to match your brand",
    category: "Utilities",
    generator: "qr",
    tags: ["qr", "branded", "link", "custom"],
    preview: {
      imageUrl: "/showcase/qr-codes/qr-brand.png",
    },
    capabilities: {
      studioCompatible: true,
    },
    codeExample: `const qr = await floimg.generate({
  generator: 'qr',
  params: {
    data: 'https://floimg.com',
    color: '#0d9488',
    backgroundColor: '#ffffff',
    margin: 2
  }
});`,
  },
  {
    id: "dark-qr",
    name: "Dark Mode QR",
    description: "QR code optimized for dark backgrounds",
    category: "Utilities",
    generator: "qr",
    tags: ["qr", "dark-mode", "link"],
    preview: {
      imageUrl: "/showcase/qr-codes/qr-dark.png",
    },
    capabilities: {
      studioCompatible: true,
    },
  },
  {
    id: "wifi-qr",
    name: "WiFi QR Code",
    description: "Scannable QR code for WiFi network access",
    category: "Utilities",
    generator: "qr",
    tags: ["qr", "wifi", "network", "guest"],
    capabilities: {
      studioCompatible: true,
    },
  },
  {
    id: "thumbnail-generator",
    name: "Thumbnail Generator",
    description: "Create multiple thumbnail sizes with automatic optimization",
    category: "Utilities",
    generator: "pipeline",
    tags: ["thumbnail", "resize", "optimize", "batch"],
    preview: {
      imageUrl: "/showcase/pipelines/output/thumb-200.png",
    },
    capabilities: {
      studioCompatible: true,
      pipeline: true,
    },
  },
];

export function getCategories(): string[] {
  return ["AI Workflows", "Data Viz", "Marketing", "Utilities"];
}

export function getTemplatesByCategory(category: string): GalleryTemplate[] {
  return templates.filter((t) => t.category === category);
}

export function getStudioUrl(templateId: string): string {
  return `https://studio.floimg.com/?template=${templateId}`;
}

export function getTemplateById(id: string): GalleryTemplate | undefined {
  return templates.find((t) => t.id === id);
}
