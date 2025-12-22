export interface PluginExample {
  name: string;
  description: string;
  image: string;
  code: string;
}

export interface Plugin {
  slug: string;
  name: string;
  packageName: string;
  description: string;
  category: "AI" | "Data Visualization" | "Diagrams" | "Utilities";
  heroImage: string;
  tags: string[];
  installation: {
    npm: string;
    pnpm: string;
  };
  quickStart: string;
  apiReference: {
    name: string;
    type: string;
    description: string;
    required?: boolean;
  }[];
  examples: PluginExample[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  links: {
    npm: string;
    github: string;
    docs: string;
  };
}

export const plugins: Plugin[] = [
  {
    slug: "quickchart",
    name: "QuickChart",
    packageName: "@teamflojo/floimg-quickchart",
    description:
      "Generate beautiful charts and graphs using Chart.js. Create bar charts, line graphs, pie charts, and more with a simple API.",
    category: "Data Visualization",
    heroImage: "/showcase/data-viz/quarterly-revenue.png",
    tags: ["charts", "graphs", "chart.js", "bar", "line", "pie", "data"],
    installation: {
      npm: "npm install @teamflojo/floimg-quickchart",
      pnpm: "pnpm add @teamflojo/floimg-quickchart",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import quickchart from "@teamflojo/floimg-quickchart";

const floimg = createClient();
floimg.registerGenerator(quickchart());

const chart = await floimg.generate({
  generator: "quickchart",
  params: {
    type: "bar",
    data: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [{
        label: "Revenue",
        data: [120, 190, 80, 150],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"]
      }]
    }
  }
});

await floimg.save(chart, "./quarterly-chart.png");`,
    apiReference: [
      {
        name: "type",
        type: '"bar" | "line" | "pie" | "doughnut" | "radar" | "polarArea"',
        description: "The type of chart to generate",
        required: true,
      },
      {
        name: "data",
        type: "ChartData",
        description: "Chart.js data object with labels and datasets",
        required: true,
      },
      {
        name: "options",
        type: "ChartOptions",
        description: "Chart.js options for customization",
        required: false,
      },
      {
        name: "width",
        type: "number",
        description: "Image width in pixels (default: 800)",
        required: false,
      },
      {
        name: "height",
        type: "number",
        description: "Image height in pixels (default: 400)",
        required: false,
      },
    ],
    examples: [
      {
        name: "Quarterly Revenue",
        description: "Bar chart showing quarterly revenue data",
        image: "/showcase/data-viz/quarterly-revenue.png",
        code: `await floimg.generate({
  generator: "quickchart",
  params: {
    type: "bar",
    data: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [{
        label: "Revenue ($K)",
        data: [120, 190, 80, 150]
      }]
    }
  }
});`,
      },
      {
        name: "Traffic by Device",
        description: "Pie chart showing device distribution",
        image: "/showcase/data-viz/traffic-by-device.png",
        code: `await floimg.generate({
  generator: "quickchart",
  params: {
    type: "pie",
    data: {
      labels: ["Desktop", "Mobile", "Tablet"],
      datasets: [{
        data: [55, 35, 10]
      }]
    }
  }
});`,
      },
      {
        name: "Monthly Users",
        description: "Line chart showing user growth",
        image: "/showcase/data-viz/monthly-users.png",
        code: `await floimg.generate({
  generator: "quickchart",
  params: {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Users",
        data: [1200, 1900, 3000, 5000, 8000],
        fill: true
      }]
    }
  }
});`,
      },
    ],
    seo: {
      title: "QuickChart Plugin - Chart.js Generator | floimg",
      description:
        "Generate beautiful charts and graphs with floimg QuickChart plugin. Create bar charts, line graphs, pie charts using Chart.js API.",
      keywords: [
        "chart generator",
        "chart.js",
        "typescript chart library",
        "node.js charts",
        "bar chart npm",
        "pie chart generator",
      ],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-quickchart",
      github: "https://github.com/TeamFlojo/floimg/tree/main/packages/floimg-quickchart",
      docs: "/docs/plugins/quickchart",
    },
  },
  {
    slug: "mermaid",
    name: "Mermaid",
    packageName: "@teamflojo/floimg-mermaid",
    description:
      "Generate diagrams from text using Mermaid syntax. Create flowcharts, sequence diagrams, class diagrams, and more.",
    category: "Diagrams",
    heroImage: "/showcase/pipelines/social-hero-final.png",
    tags: ["diagrams", "flowchart", "sequence", "class", "mermaid", "architecture"],
    installation: {
      npm: "npm install @teamflojo/floimg-mermaid",
      pnpm: "pnpm add @teamflojo/floimg-mermaid",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import mermaid from "@teamflojo/floimg-mermaid";

const floimg = createClient();
floimg.registerGenerator(mermaid());

const diagram = await floimg.generate({
  generator: "mermaid",
  params: {
    definition: \`
      flowchart TD
        A[User Request] --> B{Auth Check}
        B -->|Valid| C[Process]
        B -->|Invalid| D[401 Error]
        C --> E[Response]
    \`
  }
});

await floimg.save(diagram, "./architecture.png");`,
    apiReference: [
      {
        name: "definition",
        type: "string",
        description: "Mermaid diagram definition",
        required: true,
      },
      {
        name: "theme",
        type: '"default" | "dark" | "forest" | "neutral"',
        description: "Mermaid theme (default: default)",
        required: false,
      },
      {
        name: "backgroundColor",
        type: "string",
        description: "Background color (default: transparent)",
        required: false,
      },
      {
        name: "width",
        type: "number",
        description: "Image width in pixels",
        required: false,
      },
    ],
    examples: [
      {
        name: "API Flowchart",
        description: "Request processing flowchart",
        image: "/showcase/pipelines/social-hero-final.png",
        code: `await floimg.generate({
  generator: "mermaid",
  params: {
    definition: \`
      flowchart TD
        A[Request] --> B{Validate}
        B -->|OK| C[Process]
        B -->|Fail| D[Error]
        C --> E[Response]
    \`
  }
});`,
      },
    ],
    seo: {
      title: "Mermaid Plugin - Diagram Generator | floimg",
      description:
        "Generate diagrams from text with floimg Mermaid plugin. Create flowcharts, sequence diagrams, class diagrams programmatically.",
      keywords: [
        "mermaid diagrams",
        "flowchart generator",
        "sequence diagram npm",
        "typescript diagrams",
        "node.js diagrams",
      ],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-mermaid",
      github: "https://github.com/TeamFlojo/floimg/tree/main/packages/floimg-mermaid",
      docs: "/docs/plugins/mermaid",
    },
  },
  {
    slug: "qr",
    name: "QR Code",
    packageName: "@teamflojo/floimg-qr",
    description:
      "Generate customizable QR codes with colors, logos, and styling options. Perfect for marketing materials and digital experiences.",
    category: "Utilities",
    heroImage: "/showcase/qr-codes/qr-brand.png",
    tags: ["qr", "qrcode", "barcode", "marketing", "scan"],
    installation: {
      npm: "npm install @teamflojo/floimg-qr",
      pnpm: "pnpm add @teamflojo/floimg-qr",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import qr from "@teamflojo/floimg-qr";

const floimg = createClient();
floimg.registerGenerator(qr());

const qrCode = await floimg.generate({
  generator: "qr",
  params: {
    text: "https://floimg.com",
    color: "#000000",
    backgroundColor: "#ffffff",
    size: 400
  }
});

await floimg.save(qrCode, "./website-qr.png");`,
    apiReference: [
      {
        name: "text",
        type: "string",
        description: "The text or URL to encode",
        required: true,
      },
      {
        name: "size",
        type: "number",
        description: "QR code size in pixels (default: 200)",
        required: false,
      },
      {
        name: "color",
        type: "string",
        description: "Foreground color (default: #000000)",
        required: false,
      },
      {
        name: "backgroundColor",
        type: "string",
        description: "Background color (default: #ffffff)",
        required: false,
      },
      {
        name: "errorCorrectionLevel",
        type: '"L" | "M" | "Q" | "H"',
        description: "Error correction level (default: M)",
        required: false,
      },
    ],
    examples: [
      {
        name: "Basic QR Code",
        description: "Simple black and white QR code",
        image: "/showcase/qr-codes/qr-basic.png",
        code: `await floimg.generate({
  generator: "qr",
  params: {
    text: "https://floimg.com",
    size: 300
  }
});`,
      },
      {
        name: "Branded QR Code",
        description: "QR code with custom colors",
        image: "/showcase/qr-codes/qr-brand.png",
        code: `await floimg.generate({
  generator: "qr",
  params: {
    text: "https://floimg.com",
    color: "#6366f1",
    backgroundColor: "#f8fafc",
    size: 400
  }
});`,
      },
      {
        name: "Dark Theme QR",
        description: "Inverted colors for dark backgrounds",
        image: "/showcase/qr-codes/qr-dark.png",
        code: `await floimg.generate({
  generator: "qr",
  params: {
    text: "https://floimg.com",
    color: "#ffffff",
    backgroundColor: "#18181b",
    size: 300
  }
});`,
      },
    ],
    seo: {
      title: "QR Code Plugin - QR Generator | floimg",
      description:
        "Generate customizable QR codes with floimg QR plugin. Create branded QR codes with custom colors and styling for marketing.",
      keywords: [
        "qr code generator",
        "qr code npm",
        "typescript qr code",
        "node.js qr",
        "custom qr code",
      ],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-qr",
      github: "https://github.com/TeamFlojo/floimg/tree/main/packages/floimg-qr",
      docs: "/docs/plugins/qr",
    },
  },
  {
    slug: "screenshot",
    name: "Screenshot",
    packageName: "@teamflojo/floimg-screenshot",
    description:
      "Capture screenshots of web pages using Playwright. Full page captures, viewport screenshots, and element targeting.",
    category: "Utilities",
    heroImage: "/showcase/ai-generation/developer-workspace.png",
    tags: ["screenshot", "playwright", "browser", "capture", "webpage"],
    installation: {
      npm: "npm install @teamflojo/floimg-screenshot",
      pnpm: "pnpm add @teamflojo/floimg-screenshot",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import screenshot from "@teamflojo/floimg-screenshot";

const floimg = createClient();
floimg.registerGenerator(screenshot());

const capture = await floimg.generate({
  generator: "screenshot",
  params: {
    url: "https://github.com",
    fullPage: true,
    viewport: { width: 1920, height: 1080 }
  }
});

await floimg.save(capture, "./github-screenshot.png");`,
    apiReference: [
      {
        name: "url",
        type: "string",
        description: "URL to capture",
        required: true,
      },
      {
        name: "fullPage",
        type: "boolean",
        description: "Capture full scrollable page (default: false)",
        required: false,
      },
      {
        name: "viewport",
        type: "{ width: number, height: number }",
        description: "Viewport dimensions",
        required: false,
      },
      {
        name: "selector",
        type: "string",
        description: "CSS selector to capture specific element",
        required: false,
      },
      {
        name: "waitFor",
        type: "number | string",
        description: "Wait time in ms or selector to wait for",
        required: false,
      },
    ],
    examples: [
      {
        name: "Full Page Capture",
        description: "Capture entire scrollable page",
        image: "/showcase/ai-generation/developer-workspace.png",
        code: `await floimg.generate({
  generator: "screenshot",
  params: {
    url: "https://github.com",
    fullPage: true
  }
});`,
      },
    ],
    seo: {
      title: "Screenshot Plugin - Playwright Captures | floimg",
      description:
        "Capture webpage screenshots with floimg Screenshot plugin. Full page captures, viewport screenshots using Playwright.",
      keywords: [
        "screenshot generator",
        "playwright screenshot",
        "webpage capture npm",
        "browser screenshot",
        "node.js screenshot",
      ],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-screenshot",
      github: "https://github.com/TeamFlojo/floimg/tree/main/packages/floimg-screenshot",
      docs: "/docs/plugins/screenshot",
    },
  },
  {
    slug: "d3",
    name: "D3",
    packageName: "@teamflojo/floimg-d3",
    description:
      "Create advanced data visualizations using D3.js. Build custom charts, maps, and interactive visualizations.",
    category: "Data Visualization",
    heroImage: "/showcase/data-viz/framework-usage.png",
    tags: ["d3", "visualization", "charts", "svg", "data", "advanced"],
    installation: {
      npm: "npm install @teamflojo/floimg-d3",
      pnpm: "pnpm add @teamflojo/floimg-d3",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import d3 from "@teamflojo/floimg-d3";

const floimg = createClient();
floimg.registerGenerator(d3());

const viz = await floimg.generate({
  generator: "d3",
  params: {
    type: "treemap",
    data: {
      name: "root",
      children: [
        { name: "React", value: 45 },
        { name: "Vue", value: 30 },
        { name: "Angular", value: 15 },
        { name: "Svelte", value: 10 }
      ]
    }
  }
});

await floimg.save(viz, "./framework-usage.png");`,
    apiReference: [
      {
        name: "type",
        type: '"treemap" | "sunburst" | "force" | "custom"',
        description: "Type of D3 visualization",
        required: true,
      },
      {
        name: "data",
        type: "object",
        description: "Data structure for the visualization",
        required: true,
      },
      {
        name: "width",
        type: "number",
        description: "Image width in pixels (default: 800)",
        required: false,
      },
      {
        name: "height",
        type: "number",
        description: "Image height in pixels (default: 600)",
        required: false,
      },
      {
        name: "render",
        type: "function",
        description: "Custom D3 render function for type: custom",
        required: false,
      },
    ],
    examples: [
      {
        name: "Framework Usage",
        description: "Treemap showing framework popularity",
        image: "/showcase/data-viz/framework-usage.png",
        code: `await floimg.generate({
  generator: "d3",
  params: {
    type: "treemap",
    data: {
      name: "Frameworks",
      children: [
        { name: "React", value: 45 },
        { name: "Vue", value: 30 },
        { name: "Angular", value: 15 }
      ]
    }
  }
});`,
      },
    ],
    seo: {
      title: "D3 Plugin - Advanced Visualizations | floimg",
      description:
        "Create advanced data visualizations with floimg D3 plugin. Build treemaps, sunbursts, force graphs with D3.js.",
      keywords: [
        "d3 visualization",
        "d3.js npm",
        "typescript d3",
        "node.js visualization",
        "treemap generator",
      ],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-d3",
      github: "https://github.com/TeamFlojo/floimg/tree/main/packages/floimg-d3",
      docs: "/docs/plugins/d3",
    },
  },
  {
    slug: "openai",
    name: "OpenAI / DALL-E",
    packageName: "@teamflojo/floimg-openai",
    description:
      "Generate AI images using OpenAI DALL-E. Create photorealistic images, illustrations, and art from text prompts.",
    category: "AI",
    heroImage: "/showcase/ai-generation/futuristic-city.png",
    tags: ["ai", "dalle", "openai", "generative", "text-to-image"],
    installation: {
      npm: "npm install @teamflojo/floimg-openai",
      pnpm: "pnpm add @teamflojo/floimg-openai",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import openai from "@teamflojo/floimg-openai";

const floimg = createClient();
floimg.registerGenerator(openai());

const image = await floimg.generate({
  generator: "openai",
  params: {
    prompt: "A futuristic city at sunset with flying cars",
    model: "dall-e-3",
    size: "1024x1024",
    quality: "hd"
  }
});

await floimg.save(image, "./futuristic-city.png");`,
    apiReference: [
      {
        name: "prompt",
        type: "string",
        description: "Text description of the image to generate",
        required: true,
      },
      {
        name: "model",
        type: '"dall-e-2" | "dall-e-3"',
        description: "DALL-E model version (default: dall-e-3)",
        required: false,
      },
      {
        name: "size",
        type: '"256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792"',
        description: "Output image size",
        required: false,
      },
      {
        name: "quality",
        type: '"standard" | "hd"',
        description: "Image quality (DALL-E 3 only)",
        required: false,
      },
      {
        name: "style",
        type: '"vivid" | "natural"',
        description: "Image style (DALL-E 3 only)",
        required: false,
      },
    ],
    examples: [
      {
        name: "Futuristic City",
        description: "AI-generated cityscape at sunset",
        image: "/showcase/ai-generation/futuristic-city.png",
        code: `await floimg.generate({
  generator: "openai",
  params: {
    prompt: "A futuristic city at sunset",
    model: "dall-e-3",
    quality: "hd"
  }
});`,
      },
      {
        name: "Product Photo",
        description: "AI-generated product photography",
        image: "/showcase/ai-generation/product-headphones.png",
        code: `await floimg.generate({
  generator: "openai",
  params: {
    prompt: "Professional product photo of wireless headphones",
    model: "dall-e-3",
    style: "natural"
  }
});`,
      },
      {
        name: "Abstract Art",
        description: "AI-generated abstract gradient",
        image: "/showcase/ai-generation/abstract-gradient.png",
        code: `await floimg.generate({
  generator: "openai",
  params: {
    prompt: "Abstract flowing gradient with purple and blue",
    model: "dall-e-3"
  }
});`,
      },
    ],
    seo: {
      title: "OpenAI DALL-E Plugin - AI Image Generator | floimg",
      description:
        "Generate AI images with floimg OpenAI plugin. Create DALL-E images programmatically with TypeScript and Node.js.",
      keywords: [
        "dall-e api",
        "openai image generation",
        "ai image npm",
        "text-to-image typescript",
        "dalle node.js",
      ],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-openai",
      github: "https://github.com/TeamFlojo/floimg/tree/main/packages/floimg-openai",
      docs: "/docs/plugins/openai",
    },
  },
  {
    slug: "ollama",
    name: "Ollama",
    packageName: "@teamflojo/floimg-ollama",
    description:
      "Generate AI images using local Ollama models. Run image generation locally with open-source models.",
    category: "AI",
    heroImage: "/showcase/ai-generation/robot-mascot.png",
    tags: ["ai", "ollama", "local", "open-source", "self-hosted"],
    installation: {
      npm: "npm install @teamflojo/floimg-ollama",
      pnpm: "pnpm add @teamflojo/floimg-ollama",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import ollama from "@teamflojo/floimg-ollama";

const floimg = createClient();
floimg.registerGenerator(ollama());

const image = await floimg.generate({
  generator: "ollama",
  params: {
    prompt: "A friendly robot mascot waving",
    model: "llava",
    host: "http://localhost:11434"
  }
});

await floimg.save(image, "./robot-mascot.png");`,
    apiReference: [
      {
        name: "prompt",
        type: "string",
        description: "Text description of the image to generate",
        required: true,
      },
      {
        name: "model",
        type: "string",
        description: "Ollama model name (e.g., llava, bakllava)",
        required: true,
      },
      {
        name: "host",
        type: "string",
        description: "Ollama server URL (default: http://localhost:11434)",
        required: false,
      },
      {
        name: "options",
        type: "object",
        description: "Model-specific generation options",
        required: false,
      },
    ],
    examples: [
      {
        name: "Robot Mascot",
        description: "Locally generated mascot illustration",
        image: "/showcase/ai-generation/robot-mascot.png",
        code: `await floimg.generate({
  generator: "ollama",
  params: {
    prompt: "A friendly robot mascot",
    model: "llava"
  }
});`,
      },
    ],
    seo: {
      title: "Ollama Plugin - Local AI Images | floimg",
      description:
        "Generate AI images locally with floimg Ollama plugin. Run self-hosted image generation with open-source models.",
      keywords: [
        "ollama images",
        "local ai generation",
        "self-hosted ai",
        "open-source image ai",
        "llava npm",
      ],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-ollama",
      github: "https://github.com/TeamFlojo/floimg/tree/main/packages/floimg-ollama",
      docs: "/docs/plugins/ollama",
    },
  },
];

export function getPluginBySlug(slug: string): Plugin | undefined {
  return plugins.find((p) => p.slug === slug);
}

export function getPluginsByCategory(category: Plugin["category"]): Plugin[] {
  return plugins.filter((p) => p.category === category);
}

export function getCategories(): Plugin["category"][] {
  return [...new Set(plugins.map((p) => p.category))];
}

export function searchPlugins(query: string): Plugin[] {
  const q = query.toLowerCase();
  return plugins.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
