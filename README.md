# Subscription Manager

A pnpm workspace monorepo for tracking recurring subscriptions. It contains a React/Vite web client and an Express HTTP API backed by PostgreSQL through Drizzle ORM. The client also supports a fully static, in-memory demo mode for local use and Vercel deployment, so the app can run without a backend or database.

## Stack

- TypeScript across the workspace
- Client: Vite 7.2.4, React 19.2.0, react-router 7.10.1, Tailwind CSS 4.1.17, Radix primitives, sonner, next-themes, lucide-react
- Server: Express 5.2.1, cors 2.8.5, pino 10.1.0, @scalar/express-api-reference 0.8.25, Node `--watch`
- Data: Drizzle ORM 0.44.7, drizzle-kit 0.31.7 (dev), node-postgres (pg 8.16.3), PostgreSQL 17
- Tooling: pnpm workspaces, dotenv 17.2.3 (dev), TypeScript 5.9.3 (dev)

## Project Structure

```
.
├── apps/
│   ├── client/   Vite frontend (dev port 5173)
│   └── server/   Express API (dev port 3000)
├── package.json  Root workspace scripts
└── vercel.json   Static client deployment config
```

- `apps/client` — Vite frontend, dev port 5173. Entry `src/main.tsx`; components under `src/components`, API adapters under `src/api` and `src/features/subscriptions/api`.
- `apps/server` — Express API, dev port 3000, entry `index.ts`. Drizzle schema at `src/db/schema.ts`, migrations under `drizzle/`, and `DATABASE_URL` read from the environment via dotenv.

## Prerequisites

- Node.js 24.x (matches the Vercel project settings)
- pnpm (the server package declares `pnpm@10.18.0`; the root has no `packageManager` field)
- PostgreSQL 17 for API mode. On this machine it runs as the Windows service `postgresql-x64-17`. Docker is neither required nor available here.

## Getting Started

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Configure the database for API mode: set `DATABASE_URL` in a local `.env.local` file. This file is gitignored; never commit secrets.

3. Apply the schema and migrations by using drizzle-kit directly. There is no package.json script for migrations. The schema lives at `apps/server/src/db/schema.ts` and migrations under `apps/server/drizzle/`.

4. Start the app:

   ```sh
   pnpm dev
   ```

   This runs the client and server in parallel. The client serves on port 5173 and the API on port 3000.

   To start them individually:

   ```sh
   pnpm start:client
   pnpm start:server
   ```

## Demo Mode (static / Vercel)

Setting `VITE_DEMO_MODE=true` enables a static in-memory demo: no backend, no database, and no fetch to the API. The flag is read with `import.meta.env.VITE_DEMO_MODE === "true"`; any other value selects API mode.

Demo data (Netflix, Spotify, Figma, Notion, Google) lives in `apps/client/src/features/subscriptions/api/demo.ts`. Mutations stay in memory and are lost on reload.

The live static deployment is at https://subscription-manager-minn09s-projects.vercel.app. Vercel serves only the client: `vercel.json` defines the static build command, the `apps/client/dist` output directory, and an SPA rewrite. Project settings are configured in the Vercel dashboard, not in this repository: framework Vite, Node 24.x, install command `cd apps/client && npm install --no-audit --no-fund`, build command `cd apps/client && npm run build`, output directory `apps/client/dist`, and environment variable `VITE_DEMO_MODE=true`. Pushing to `main` triggers a deploy.

## Database Unavailable

When PostgreSQL is down, the API returns HTTP 503 with:

```json
{"error":"Database unavailable","code":"DATABASE_UNAVAILABLE"}
```

The client then pins a "Database unavailable" alert and routes CRUD operations to the in-memory demo store. In Vercel demo mode there is no such alert, because no backend is contacted.

## Available Scripts

| Command | Defined in | Runs |
| --- | --- | --- |
| `pnpm install` | pnpm (native) | Install workspace dependencies (`install:all` is an alias script) |
| `pnpm dev` | root | `pnpm --parallel dev` (client + server) |
| `pnpm start:client` | root | `pnpm --filter client-subscription-manager dev` |
| `pnpm start:server` | root | `pnpm --filter server-subscription-manager dev` |
| `pnpm --filter client-subscription-manager dev` | client | `vite` |
| `pnpm --filter client-subscription-manager build` | client | `tsc -b && vite build` |
| `pnpm --filter client-subscription-manager lint` | client | `eslint .` |
| `pnpm --filter client-subscription-manager preview` | client | `vite preview` |
| `pnpm --filter server-subscription-manager dev` | server | `node --watch index.ts` |
| Root `build` / `test` / `format` | — | N/A (no such script) |
| Database migrations (`drizzle` script) | — | N/A (use drizzle-kit directly) |

## Features

- Subscription CRUD: name, price, renewal date, and category
- Dashboard cards with monthly and annual cost
- Renewal notifications seven days ahead
- Category filters and search
- JSON export and import
- Monthly calendar
- Dark mode

## Known Limitations

- Login and authentication are not implemented.
- With PostgreSQL stopped locally, the API returns 503 and the client falls back to the in-memory demo store; changes are lost on reload.
- `pnpm-lock.yaml` is gitignored and there is no root `packageManager` field; versions are pinned exactly in each package.json. The server package.json declares `pnpm@10.18.0`, but the root does not.
