export interface PluginExample {
  name: string;
  description: string;
  image: string;
  code: string;
}

export interface PoweredBy {
  name: string;
  url: string;
  description: string;
  via?: {
    name: string;
    url: string;
  };
}

export interface Plugin {
  slug: string;
  name: string;
  packageName: string;
  description: string;
  category: "AI" | "Data Visualization" | "Diagrams" | "Utilities";
  heroImage: string;
  tags: string[];
  poweredBy: PoweredBy;
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
    poweredBy: {
      name: "Chart.js",
      url: "https://www.chartjs.org/",
      description: "The popular open-source charting library.",
      via: {
        name: "QuickChart",
        url: "https://quickchart.io/",
      },
    },
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
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-quickchart",
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
    poweredBy: {
      name: "Mermaid.js",
      url: "https://mermaid.js.org/",
      description: "JavaScript-based diagramming and charting tool.",
    },
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
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-mermaid",
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
    poweredBy: {
      name: "qrcode",
      url: "https://www.npmjs.com/package/qrcode",
      description: "QR code generator for Node.js and browsers.",
    },
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
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-qr",
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
    poweredBy: {
      name: "Playwright",
      url: "https://playwright.dev/",
      description: "Reliable end-to-end testing and browser automation.",
    },
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
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-screenshot",
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
    poweredBy: {
      name: "D3.js",
      url: "https://d3js.org/",
      description: "The JavaScript library for data-driven documents.",
    },
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
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-d3",
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
    poweredBy: {
      name: "OpenAI DALL-E",
      url: "https://openai.com/dall-e-3",
      description: "OpenAI's image generation model.",
    },
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
    prompt: "Abstract flowing gradient with teal and blue",
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
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-openai",
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
    poweredBy: {
      name: "Ollama",
      url: "https://ollama.ai/",
      description: "Run large language models locally.",
    },
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
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-ollama",
      docs: "/docs/plugins/ollama",
    },
  },
  {
    slug: "stability",
    name: "Stability AI",
    packageName: "@teamflojo/floimg-stability",
    description:
      "Generate images with Stable Diffusion models and AI-powered transforms like background removal, upscaling, and inpainting.",
    category: "AI",
    heroImage: "/showcase/ai-generation/futuristic-city.png",
    tags: [
      "ai",
      "stable-diffusion",
      "sdxl",
      "sd3",
      "generative",
      "transforms",
      "background-removal",
      "upscale",
    ],
    poweredBy: {
      name: "Stability AI",
      url: "https://stability.ai/",
      description: "Stable Diffusion image generation and AI transforms.",
    },
    installation: {
      npm: "npm install @teamflojo/floimg-stability",
      pnpm: "pnpm add @teamflojo/floimg-stability",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import stability, { stabilityTransform } from "@teamflojo/floimg-stability";

const floimg = createClient();
floimg.registerGenerator(stability({ apiKey: process.env.STABILITY_API_KEY }));
floimg.registerTransformProvider(stabilityTransform({ apiKey: process.env.STABILITY_API_KEY }));

// Generate an image
const image = await floimg.generate({
  generator: "stability",
  params: {
    prompt: "A futuristic city at sunset, cyberpunk style",
    model: "sd3-large",
    aspectRatio: "16:9"
  }
});

// Remove background
const noBg = await floimg.transform({
  blob: image,
  op: "removeBackground",
  provider: "stability-transform"
});

await floimg.save(noBg, "./city-no-bg.png");`,
    apiReference: [
      {
        name: "prompt",
        type: "string",
        description: "Text description of the image to generate",
        required: true,
      },
      {
        name: "model",
        type: '"sd3-large" | "sd3-medium" | "sdxl"',
        description: "Stable Diffusion model (default: sd3-large)",
        required: false,
      },
      {
        name: "negativePrompt",
        type: "string",
        description: "What to avoid in the image",
        required: false,
      },
      {
        name: "aspectRatio",
        type: '"1:1" | "16:9" | "9:16" | "4:3" | "3:4"',
        description: "Image aspect ratio (default: 1:1)",
        required: false,
      },
      {
        name: "seed",
        type: "number",
        description: "Random seed for reproducibility",
        required: false,
      },
    ],
    examples: [
      {
        name: "Cyberpunk City",
        description: "AI-generated cyberpunk cityscape",
        image: "/showcase/ai-generation/futuristic-city.png",
        code: `await floimg.generate({
  generator: "stability",
  params: {
    prompt: "Cyberpunk city at night, neon lights",
    model: "sd3-large",
    aspectRatio: "16:9"
  }
});`,
      },
      {
        name: "Remove Background",
        description: "Remove background from product photo",
        image: "/showcase/ai-generation/product-headphones.png",
        code: `await floimg.transform({
  blob: productImage,
  op: "removeBackground",
  provider: "stability-transform"
});`,
      },
    ],
    seo: {
      title: "Stability AI Plugin - Stable Diffusion & AI Transforms | floimg",
      description:
        "Generate images with Stable Diffusion and AI transforms. Background removal, upscaling, inpainting with floimg.",
      keywords: [
        "stable diffusion api",
        "sdxl npm",
        "ai image generation",
        "background removal api",
        "ai upscale",
      ],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-stability",
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-stability",
      docs: "/docs/plugins/stability",
    },
  },
  {
    slug: "google",
    name: "Google AI (Gemini + Imagen)",
    packageName: "@teamflojo/floimg-google",
    description:
      "AI text generation, vision analysis, image editing, and generation with Google's Gemini and Imagen models.",
    category: "AI",
    heroImage: "/showcase/ai-generation/abstract-gradient.png",
    tags: ["ai", "gemini", "imagen", "google", "vision", "text", "editing", "generative"],
    poweredBy: {
      name: "Google AI",
      url: "https://ai.google.dev/",
      description: "Gemini and Imagen AI models.",
    },
    installation: {
      npm: "npm install @teamflojo/floimg-google",
      pnpm: "pnpm add @teamflojo/floimg-google",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import { geminiText, geminiVision, geminiEdit, imagen } from "@teamflojo/floimg-google";

const floimg = createClient();
floimg.registerTextProvider(geminiText());
floimg.registerVisionProvider(geminiVision());
floimg.registerTransformProvider(geminiEdit());
floimg.registerGenerator(imagen());

// Generate text
const result = await floimg.generateText({
  provider: "gemini-text",
  params: { prompt: "Write 3 creative image prompts" }
});

// Analyze an image
const analysis = await floimg.analyzeImage({
  provider: "gemini-vision",
  blob: image,
  params: { prompt: "Describe this image" }
});`,
    apiReference: [
      {
        name: "prompt",
        type: "string",
        description: "Text prompt for generation or analysis",
        required: true,
      },
      {
        name: "systemPrompt",
        type: "string",
        description: "System prompt to guide behavior",
        required: false,
      },
      {
        name: "outputFormat",
        type: '"text" | "json"',
        description: "Output format (default: text)",
        required: false,
      },
      {
        name: "jsonSchema",
        type: "object",
        description: "JSON schema for structured output",
        required: false,
      },
      {
        name: "temperature",
        type: "number",
        description: "Creativity 0-2 (default: 0.7)",
        required: false,
      },
    ],
    examples: [
      {
        name: "Generate Prompts",
        description: "Use Gemini to generate image prompts",
        image: "/showcase/ai-generation/abstract-gradient.png",
        code: `const result = await floimg.generateText({
  provider: "gemini-text",
  params: {
    prompt: "Generate 3 prompts for product photos",
    outputFormat: "json"
  }
});`,
      },
      {
        name: "Analyze Image",
        description: "Use Gemini Vision to analyze photos",
        image: "/showcase/ai-generation/product-headphones.png",
        code: `const analysis = await floimg.analyzeImage({
  provider: "gemini-vision",
  blob: image,
  params: { prompt: "What's in this image?" }
});`,
      },
    ],
    seo: {
      title: "Google AI Plugin - Gemini & Imagen | floimg",
      description:
        "AI text, vision, and image generation with Google Gemini and Imagen. Structured JSON output, image analysis, and editing.",
      keywords: ["gemini api", "imagen api", "google ai npm", "gemini vision", "ai image analysis"],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-google",
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-google",
      docs: "/docs/plugins/google",
    },
  },
  {
    slug: "replicate",
    name: "Replicate",
    packageName: "@teamflojo/floimg-replicate",
    description:
      "AI-powered image transforms including face restoration (GFPGAN), colorization (DeOldify), upscaling (Real-ESRGAN), and text-guided editing (FLUX).",
    category: "AI",
    heroImage: "/showcase/ai-generation/robot-mascot.png",
    tags: ["ai", "replicate", "gfpgan", "esrgan", "colorize", "upscale", "face-restore", "flux"],
    poweredBy: {
      name: "Replicate",
      url: "https://replicate.com/",
      description: "Run thousands of AI models via API.",
    },
    installation: {
      npm: "npm install @teamflojo/floimg-replicate",
      pnpm: "pnpm add @teamflojo/floimg-replicate",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import { replicateTransform } from "@teamflojo/floimg-replicate";

const floimg = createClient();
floimg.registerTransformProvider(replicateTransform({
  apiToken: process.env.REPLICATE_API_TOKEN
}));

// Restore faces in old photos
const restored = await floimg.transform({
  blob: oldPhoto,
  op: "faceRestore",
  provider: "replicate-transform",
  params: { version: "v1.4", scale: 2 }
});

// Colorize black and white photos
const colorized = await floimg.transform({
  blob: bwPhoto,
  op: "colorize",
  provider: "replicate-transform"
});

// AI upscale with Real-ESRGAN
const upscaled = await floimg.transform({
  blob: image,
  op: "realEsrgan",
  provider: "replicate-transform",
  params: { scale: 4 }
});`,
    apiReference: [
      {
        name: "op",
        type: '"faceRestore" | "colorize" | "realEsrgan" | "fluxEdit"',
        description: "Transform operation to perform",
        required: true,
      },
      {
        name: "version",
        type: '"v1.3" | "v1.4" | "RestoreFormer"',
        description: "GFPGAN version for faceRestore (default: v1.4)",
        required: false,
      },
      {
        name: "scale",
        type: "number",
        description: "Upscale factor 1-4 (default: 2)",
        required: false,
      },
      {
        name: "renderFactor",
        type: "number",
        description: "Color intensity 7-40 for colorize (default: 35)",
        required: false,
      },
      {
        name: "prompt",
        type: "string",
        description: "Edit instruction for fluxEdit",
        required: false,
      },
    ],
    examples: [
      {
        name: "Restore Old Photo",
        description: "Enhance faces in vintage photos",
        image: "/showcase/ai-generation/robot-mascot.png",
        code: `await floimg.transform({
  blob: oldPhoto,
  op: "faceRestore",
  provider: "replicate-transform",
  params: { version: "v1.4" }
});`,
      },
      {
        name: "Colorize B&W",
        description: "Add color to black and white photos",
        image: "/showcase/ai-generation/abstract-gradient.png",
        code: `await floimg.transform({
  blob: bwPhoto,
  op: "colorize",
  provider: "replicate-transform",
  params: { renderFactor: 35 }
});`,
      },
    ],
    seo: {
      title: "Replicate Plugin - AI Image Transforms | floimg",
      description:
        "AI image transforms with Replicate. Face restoration, colorization, upscaling, and text-guided editing.",
      keywords: [
        "replicate api",
        "gfpgan npm",
        "ai upscale",
        "colorize photos",
        "face restoration",
      ],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-replicate",
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-replicate",
      docs: "/docs/plugins/replicate",
    },
  },
  {
    slug: "xai",
    name: "xAI (Grok)",
    packageName: "@teamflojo/floimg-xai",
    description:
      "AI text generation and vision analysis with xAI's Grok models. Structured JSON output and image understanding.",
    category: "AI",
    heroImage: "/showcase/ai-generation/futuristic-city.png",
    tags: ["ai", "xai", "grok", "text", "vision", "analysis", "json"],
    poweredBy: {
      name: "xAI",
      url: "https://x.ai/",
      description: "Grok AI models from xAI.",
    },
    installation: {
      npm: "npm install @teamflojo/floimg-xai",
      pnpm: "pnpm add @teamflojo/floimg-xai",
    },
    quickStart: `import createClient from "@teamflojo/floimg";
import { grokText, grokVision } from "@teamflojo/floimg-xai";

const floimg = createClient();
floimg.registerTextProvider(grokText());
floimg.registerVisionProvider(grokVision());

// Generate text
const result = await floimg.generateText({
  provider: "grok-text",
  params: {
    prompt: "Write 3 creative image prompts for a cyberpunk cityscape"
  }
});

// Analyze an image
const analysis = await floimg.analyzeImage({
  provider: "grok-vision",
  blob: image,
  params: { prompt: "Describe this image in detail" }
});`,
    apiReference: [
      {
        name: "prompt",
        type: "string",
        description: "Text prompt for generation or analysis",
        required: true,
      },
      {
        name: "systemPrompt",
        type: "string",
        description: "System prompt to guide behavior",
        required: false,
      },
      {
        name: "outputFormat",
        type: '"text" | "json"',
        description: "Output format (default: text)",
        required: false,
      },
      {
        name: "jsonSchema",
        type: "object",
        description: "JSON schema for structured output",
        required: false,
      },
      {
        name: "temperature",
        type: "number",
        description: "Creativity 0-2 (default: 0.7)",
        required: false,
      },
    ],
    examples: [
      {
        name: "Generate Prompts",
        description: "Use Grok to generate image prompts",
        image: "/showcase/ai-generation/futuristic-city.png",
        code: `const result = await floimg.generateText({
  provider: "grok-text",
  params: {
    prompt: "Generate creative prompts for a sci-fi scene",
    outputFormat: "json"
  }
});`,
      },
      {
        name: "Analyze Image",
        description: "Use Grok Vision to understand images",
        image: "/showcase/ai-generation/product-headphones.png",
        code: `const analysis = await floimg.analyzeImage({
  provider: "grok-vision",
  blob: image,
  params: { prompt: "What product is shown?" }
});`,
      },
    ],
    seo: {
      title: "xAI Plugin - Grok Text & Vision | floimg",
      description:
        "AI text generation and vision analysis with xAI Grok. Structured JSON output and image understanding.",
      keywords: ["grok api", "xai npm", "grok vision", "ai text generation", "image analysis"],
    },
    links: {
      npm: "https://www.npmjs.com/package/@teamflojo/floimg-xai",
      github: "https://github.com/TeamFlojo/FloImg/tree/main/packages/floimg-xai",
      docs: "/docs/plugins/xai",
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
