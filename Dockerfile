# floimg-web Dockerfile
# Multi-stage build for Astro SSR site with Node adapter

# Stage 1: Build
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/frontend/package.json ./packages/frontend/

# Install dependencies (--ignore-scripts skips prepare/husky in prod)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source code
COPY packages/shared ./packages/shared
COPY packages/frontend ./packages/frontend

# Build shared types first (if it exists)
RUN pnpm --filter @floimg-web/shared build 2>/dev/null || true

# Build Astro SSR site
RUN pnpm --filter @floimg-web/frontend build

# Stage 2: Production with Node
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built server and client files
COPY --from=builder /app/packages/frontend/dist ./dist

# Expose port
EXPOSE 80

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || exit 1

# Run the Node server
CMD ["node", "./dist/server/entry.mjs"]
