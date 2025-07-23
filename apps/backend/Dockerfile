# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY ../../pnpm-workspace.yaml ./
COPY ../../libs ./libs
COPY . .
RUN npm install -g pnpm && pnpm install --frozen-lockfile && pnpm build

# Stage 2: Run
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json ./
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile
EXPOSE 3000
CMD ["node", "dist/main.js"] 