# Astro + NestJS Monorepo Template

This is a monorepo template using Astro for the frontend and NestJS for the backend, managed with pnpm workspaces.

## Structure

- `apps/frontend`: Astro frontend app
- `apps/backend`: NestJS backend app
- `libs/`: Shared libraries (types, utils, etc.)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run all apps in development mode:

```bash
pnpm dev
```

## Docker

Each app can be containerized separately. See the respective `apps/*/README.md` for details.

## Workspaces

This repo uses [pnpm workspaces](https://pnpm.io/workspaces) for dependency management.

## License

MIT
