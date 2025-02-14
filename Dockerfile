# Base image
FROM node:23.3.0 AS base

# Dependencies
FROM base AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Standalone production
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production
RUN addgroup --system -gid 1001 nodejs
RUN adduser --system -uid 1001 --ingroup nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
