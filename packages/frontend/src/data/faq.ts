export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  slug: string;
  questions: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    name: "Getting Started",
    slug: "getting-started",
    questions: [
      {
        question: "What is FloImg?",
        answer:
          "FloImg is a composable workflow engine for images. It handles any combination of generation (AI images, charts, diagrams, QR codes), transforms (resize, caption, format conversion, watermarks), and destinations (local files, S3, R2, Tigris). The pipeline is the product: any source → any transforms → any destination.",
      },
      {
        question: "What's the difference between FloImg, FloImg Studio, and FloImg Studio Cloud?",
        answer:
          "FloImg is the MIT-licensed core library (npm package @teamflojo/floimg) for programmatic workflows. FloImg Studio is a visual drag-and-drop workflow builder that's also MIT-licensed and self-hostable. FloImg Studio Cloud is our managed cloud service at studio.floimg.com—no setup required, bundled infrastructure, just works.",
      },
      {
        question: "How do I install FloImg?",
        answer:
          "Install via npm: npm install @teamflojo/floimg. For TypeScript projects, types are included. See our Getting Started guide for a complete walkthrough.",
      },
      {
        question: "Do I need to sign up to use FloImg?",
        answer:
          "No. The core library and self-hosted FloImg Studio are completely free and require no account. FloImg Studio Cloud requires a free account for workflow persistence and cloud features.",
      },
      {
        question: "Can I use FloImg with Claude Code?",
        answer:
          "Yes! Install the @teamflojo/floimg-claude plugin and use natural language commands to generate, transform, and save images directly in Claude Code. The plugin exposes FloImg's capabilities as MCP tools.",
      },
      {
        question: "What programming languages does FloImg support?",
        answer:
          "FloImg is written in TypeScript and works with JavaScript and TypeScript via npm. The API is simple HTTP/JSON, so you can integrate with any language that makes HTTP requests. Official SDKs for other languages are on the roadmap.",
      },
    ],
  },
  {
    name: "Pricing & Plans",
    slug: "pricing",
    questions: [
      {
        question: "Is FloImg free?",
        answer:
          "Yes. The core library (@teamflojo/floimg) and FloImg Studio are MIT-licensed and free forever. FloImg Studio Cloud has a generous free tier with 50 images/month and 100MB storage.",
      },
      {
        question: "What's included in the Free tier?",
        answer:
          "The Free tier includes 50 images/month, 100MB storage, unlimited workflows, and 1 user. You get access to all non-AI generators: charts, diagrams, QR codes, screenshots, and all transforms.",
      },
      {
        question: "Why doesn't the Free tier include AI generation?",
        answer:
          "AI operations have real API costs (OpenAI, Stability AI charge per image). The Free tier lets you explore FloImg's capabilities without us subsidizing AI costs. Upgrade to Starter ($10/mo) for 50 AI images/month.",
      },
      {
        question: "What are the pricing tiers?",
        answer:
          "Free: 50 images/mo, 100MB, no AI. Starter ($10/mo): 500 images/mo, 50 AI images/mo, 1GB, 3 seats. Pro ($39/mo): 2,000 images/mo, 200 AI images/mo, 10GB, 10 seats, API access. Enterprise: custom pricing with unlimited usage, SLA, and SSO.",
      },
      {
        question: "What counts as an 'image'?",
        answer:
          "Each generation or save operation counts as 1 image. Transforms don't count separately—a workflow with 1 generation + 5 transforms + 1 save = 2 images (1 generate + 1 save).",
      },
      {
        question: "Can I self-host instead of paying?",
        answer:
          "Yes. FloImg Studio is fully self-hostable under the MIT license. You handle your own infrastructure (servers, storage, AI API keys) instead of paying our subscription. No vendor lock-in.",
      },
      {
        question: "Do you offer discounts for students or nonprofits?",
        answer:
          "Yes. We offer 50% off all paid plans for verified students, educators, and registered nonprofits. Contact us at contact@goflojo.com with verification.",
      },
    ],
  },
  {
    name: "Features & Capabilities",
    slug: "features",
    questions: [
      {
        question: "What image formats does FloImg support?",
        answer:
          "FloImg supports PNG, JPEG, WebP, GIF, AVIF, TIFF, and SVG. Format conversion is a built-in transform—convert between any supported formats in your workflow.",
      },
      {
        question: "Can FloImg generate AI images?",
        answer:
          "Yes. FloImg integrates with OpenAI (DALL-E 3), Stability AI, and local models via Ollama. AI generation is available as a workflow step that can be chained with transforms and saves.",
      },
      {
        question: "What AI providers does FloImg support?",
        answer:
          "Currently: OpenAI (DALL-E 3, GPT-4 Vision for captions), Stability AI (Stable Diffusion), and Ollama for local models. More providers are on the roadmap based on community feedback.",
      },
      {
        question: "Can I use my own API keys?",
        answer:
          "Yes. In FloImg Studio Cloud, you can configure your own API keys for OpenAI, Stability AI, and other providers. This is especially useful for teams with existing API agreements or enterprise pricing.",
      },
      {
        question: "How do I chain multiple operations?",
        answer:
          "FloImg is built for composition. In code: floimg.generate().resize().caption().save(). In Studio: drag nodes and connect them visually. Each step's output becomes the next step's input.",
      },
      {
        question: "Can I save and export my workflows?",
        answer:
          "Yes. Export workflows as YAML, JSON, or code (JavaScript/TypeScript). Workflows are portable—use them in CI/CD, scripts, or migrate between self-hosted and cloud deployments.",
      },
      {
        question: "Does FloImg work offline?",
        answer:
          "The core library works offline for local generators (charts, QR codes) and transforms. AI generation requires internet access. Self-hosted FloImg Studio can run entirely on your local network.",
      },
      {
        question: "How does FloImg work with AI image generators?",
        answer:
          "FloImg integrates AI generators (DALL-E, Stability, Ollama) as pipeline steps. Generate an image with AI, then apply deterministic transforms—resize to exact dimensions, adjust colors precisely, add captions—and save to cloud storage. One pipeline handles the full workflow: creative generation → precise transforms → delivery.",
      },
      {
        question: "How does content moderation work?",
        answer:
          "FloImg Studio Cloud scans all AI-generated images before saving using OpenAI's moderation API. Flagged content is blocked and logged. Self-hosted users control their own moderation settings. See our Safety page for full details.",
      },
    ],
  },
  {
    name: "Self-Hosting",
    slug: "self-hosting",
    questions: [
      {
        question: "How do I self-host FloImg Studio?",
        answer:
          "Clone the repository, configure environment variables for your database and storage, and run with Docker or Node.js. See our Self-Hosting Guide for detailed instructions including Docker Compose examples.",
      },
      {
        question: "What are the system requirements?",
        answer:
          "Minimum: Node.js 18+, PostgreSQL (or SQLite for development), 1GB RAM. Recommended: 2GB+ RAM, S3-compatible storage (AWS S3, Cloudflare R2, MinIO). Sharp (our transform library) requires platform-specific builds.",
      },
      {
        question: "Can I use my own S3-compatible storage?",
        answer:
          "Yes. FloImg works with any S3-compatible storage: AWS S3, Cloudflare R2, Tigris, MinIO, DigitalOcean Spaces, Backblaze B2. Configure your endpoint and credentials in the environment.",
      },
      {
        question: "How do I update my self-hosted instance?",
        answer:
          "Pull the latest version from GitHub, run database migrations if needed, and restart. We follow semantic versioning—check the changelog for breaking changes before major version upgrades.",
      },
      {
        question: "Is self-hosting really free?",
        answer:
          "Yes. FloImg Studio is MIT-licensed with no usage restrictions. You pay only for your own infrastructure (servers, storage, AI API keys). There's no 'enterprise' license required for self-hosting.",
      },
    ],
  },
  {
    name: "Open Source & Licensing",
    slug: "licensing",
    questions: [
      {
        question: "What license is FloImg under?",
        answer:
          "MIT. The core library, all plugins, and FloImg Studio are MIT-licensed. You're free to use, modify, and distribute FloImg in personal and commercial projects.",
      },
      {
        question: "Can I use FloImg in commercial projects?",
        answer:
          "Yes. The MIT license allows commercial use with no restrictions. Many companies use FloImg in production for content pipelines, marketing automation, and developer tools.",
      },
      {
        question: "Will the license ever change?",
        answer:
          "No. The core library and FloImg Studio will remain MIT forever. Any new cloud-only features may have different licensing, but existing MIT code stays MIT. We don't do rug-pull licensing.",
      },
      {
        question: "How does FloImg make money if it's open source?",
        answer:
          "We follow the open-core model (like GitLab, Supabase). The core is free and self-hostable. We charge for managed infrastructure (FloImg Studio Cloud) for teams who want convenience over control.",
      },
      {
        question: "Can I contribute to FloImg?",
        answer:
          "Yes! We welcome contributions. FloImg has a plugin architecture—contribute generators, transforms, or core improvements via GitHub. See CONTRIBUTING.md for guidelines and our community Discord for discussions.",
      },
    ],
  },
  {
    name: "Support & Account",
    slug: "support",
    questions: [
      {
        question: "How do I get support?",
        answer:
          "Free tier: Community support via GitHub Discussions and Discord. Starter/Pro: Email support (contact@goflojo.com) with 48-hour response time. Enterprise: Dedicated support with SLA guarantees.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot password' on the login page at floimg.com/login. You'll receive a reset link via email. Links expire after 1 hour for security.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes. Go to Settings → Account → Delete Account in FloImg Studio Cloud. This permanently deletes your workflows, images, and all associated data. This action cannot be undone.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "Go to Settings → Billing → Cancel Subscription. You'll retain access to paid features until the end of your current billing period. Your workflows and data remain accessible on the Free tier.",
      },
    ],
  },
];
