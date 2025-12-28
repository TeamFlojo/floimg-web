import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://floimg.com',
  integrations: [
    starlight({
      title: 'floimg',
      description: 'Universal image workflow engine for developers and AI agents',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/TeamFlojo/floimg' },
      ],
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://analytics.goflojo.com/script.js',
            'data-website-id': '613c8ef0-c4fc-4059-8378-7818aadfff26',
          },
        },
      ],
      // Disable Starlight's default index page so our marketing page at / works
      disable404Route: false,
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'docs/getting-started/installation' },
            { label: 'Quick Start', slug: 'docs/getting-started/quick-start' },
            { label: 'Core Concepts', slug: 'docs/getting-started/concepts' },
          ],
        },
        {
          label: 'SDK',
          items: [
            { label: 'Fluent API', slug: 'docs/sdk/fluent' },
            { label: 'Generate', slug: 'docs/sdk/generate' },
            { label: 'Transform', slug: 'docs/sdk/transform' },
            { label: 'Save', slug: 'docs/sdk/save' },
          ],
        },
        {
          label: 'Plugins',
          items: [
            { label: 'Overview', slug: 'docs/plugins' },
            { label: 'QuickChart', slug: 'docs/plugins/quickchart' },
            { label: 'Mermaid', slug: 'docs/plugins/mermaid' },
            { label: 'QR Code', slug: 'docs/plugins/qr' },
            { label: 'D3', slug: 'docs/plugins/d3' },
            { label: 'Screenshot', slug: 'docs/plugins/screenshot' },
            { label: 'OpenAI', slug: 'docs/plugins/openai' },
            { label: 'Ollama', slug: 'docs/plugins/ollama' },
            { label: 'Google Imagen', slug: 'docs/plugins/google' },
            { label: 'Replicate', slug: 'docs/plugins/replicate' },
            { label: 'Stability AI', slug: 'docs/plugins/stability' },
          ],
        },
        {
          label: 'CLI',
          items: [
            { label: 'Overview', slug: 'docs/cli' },
            { label: 'Generate', slug: 'docs/cli/generate' },
            { label: 'Transform', slug: 'docs/cli/transform' },
          ],
        },
        {
          label: 'Claude Code',
          items: [
            { label: 'Overview', slug: 'docs/claude-code' },
            { label: 'Commands', slug: 'docs/claude-code/commands' },
            { label: 'Image Architect Agent', slug: 'docs/claude-code/agent' },
            { label: 'Auto-Discovery Skills', slug: 'docs/claude-code/skills' },
          ],
        },
        {
          label: 'MCP',
          items: [
            { label: 'Overview', slug: 'docs/mcp' },
            { label: 'Claude Integration', slug: 'docs/mcp/claude-integration' },
            { label: 'Tool Reference', slug: 'docs/mcp/tools' },
            { label: 'Examples', slug: 'docs/mcp/examples' },
          ],
        },
        {
          label: 'Studio',
          items: [
            { label: 'Overview', slug: 'docs/studio' },
            { label: 'Building Workflows', slug: 'docs/studio/workflows' },
            { label: 'Node Reference', slug: 'docs/studio/nodes' },
            { label: 'Self-Hosting', slug: 'docs/studio/self-hosting' },
          ],
        },
      ],
    }),
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
});
