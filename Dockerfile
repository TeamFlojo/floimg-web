# floimg-web Dockerfile
# Multi-stage build for Astro SSR site

# Stage 1: Build
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/frontend/package.json ./packages/frontend/
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY packages/shared ./packages/shared
COPY packages/frontend ./packages/frontend
RUN pnpm --filter @floimg-web/shared build 2>/dev/null || true
RUN pnpm --filter @floimg-web/frontend build

# Stage 2: Production dependencies
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/frontend/package.json ./packages/frontend/
RUN pnpm install --frozen-lockfile --ignore-scripts --prod

# Stage 3: Runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/frontend/node_modules ./packages/frontend/node_modules
COPY --from=builder /app/packages/frontend/dist ./packages/frontend/dist
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || exit 1
CMD ["node", "./packages/frontend/dist/server/entry.mjs"]
