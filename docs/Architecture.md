# Architecture Overview

This monorepo provides a modern full-stack framework template, combining the best of Astro (with React and Tailwind CSS) for the frontend, and NestJS (with Prisma and Redis) for the backend. Shared TypeScript libraries enable type-safe communication and code reuse across the stack. The project is managed with pnpm workspaces for efficient dependency management and developer experience.

---

## Monorepo Structure

```
/
├── apps/
│   ├── frontend/      ← Astro + React + Tailwind
│   └── backend/       ← NestJS API (REST, Prisma, Redis)
└── libs/
    ├── shared-types/  ← shared DTOs, interfaces
    └── utils/         ← Node utility/helper packages
```

- **apps/frontend**: Astro app with React and Tailwind CSS for building modern UIs.
- **apps/backend**: NestJS REST API, with Prisma ORM for database access and Redis for caching.
- **libs/shared-types**: Shared TypeScript types and DTOs for type-safe API contracts.
- **libs/utils**: Shared utility functions for use across backend and frontend.

---

## Tooling & Conventions

- **pnpm workspaces**: Manages dependencies and scripts across all packages.
- **ESLint**: Linting for consistent code quality (`eslint.config.mjs` in backend, extendable to all packages).
- **Prettier**: Code formatting (`.prettierrc` at root and per-package).
- **Husky**: Git hooks for pre-commit checks (`.husky/pre-commit` runs tests).
- **Commitlint**: Enforces conventional commit messages.
- **Import Aliases**: Use `@shared-types/*` and `@utils/*` for clean imports (see `tsconfig.base.json`).

---

## Development Workflow

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run all apps in development mode

```bash
pnpm dev
```

- Frontend: [http://localhost:4321](http://localhost:4321)
- Backend: [http://localhost:3000](http://localhost:3000)

### 3. Build all apps

```bash
pnpm build
```

### 4. Lint, format, and test

```bash
pnpm lint
pnpm format
pnpm test
```

### 5. Git Hooks

- Pre-commit: Runs tests to ensure code quality before commits.

---

## Backend: NestJS + Prisma + Redis

- **REST API**: Scaffold endpoints in `apps/backend/src/modules/`.
- **Prisma ORM**: Define models in `apps/backend/prisma/schema.prisma`.
- **Redis**: Integrate caching via a NestJS service (add to `app.module.ts`).

**Sample Prisma model:**

```prisma
// apps/backend/prisma/schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
}
```

---

## Frontend: Astro + React + Tailwind

- **Astro**: File-based routing in `src/pages/`.
- **React**: Use React components in `src/components/`.
- **Tailwind CSS**: Utility-first styling, configured in `tailwind.config.js`.

**Sample Tailwind page:**

```astro
---
// src/pages/index.astro
---
<div class="p-8 bg-blue-100 rounded">
  <h1 class="text-2xl font-bold text-blue-900">Welcome to the Template!</h1>
</div>
```

---

## Shared Libraries

- **shared-types**: Place DTOs and interfaces in `libs/shared-types/src/`.
- **utils**: Place reusable functions in `libs/utils/src/`.

**Import example:**

```ts
import { MyDTO } from '@shared-types/index';
import { myHelper } from '@utils/index';
```

---

## Extending the Template

1. **Add new REST endpoints** in backend, use DTOs from `shared-types`.
2. **Add new pages/components** in frontend, style with Tailwind.
3. **Add new models** in Prisma, run `pnpm prisma generate` in backend.
4. **Add new utilities/types** in `libs/` and import via aliases.

---

## Scripts Reference

- `pnpm dev` – Run all apps in dev mode
- `pnpm build` – Build all apps/libs
- `pnpm lint` – Lint all packages
- `pnpm format` – Format codebase with Prettier
- `pnpm test` – Run all tests

---

## Best Practices

- Use shared types for API contracts.
- Keep utility code in `libs/utils` for reuse.
- Use import aliases for maintainable imports.
- Enforce code quality with lint, format, and test scripts.
- Use git hooks to prevent bad commits.

---

## Getting Help

- [Astro Documentation](https://docs.astro.build)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)

---

## License

MIT
