# Proyecto

## Qué es
Subscription manager: monorepo pnpm con cliente web y servidor API.

## Stack y estructura
- Stack: pnpm workspace, TypeScript, Vite 7.2.4 (cliente), Node --watch (servidor), Drizzle ORM 0.44.7 + node-postgres 8.16.3, PostgreSQL 17.
- `apps/client`: frontend Vite (:5173).
- `apps/server`: API HTTP (:3000) + Drizzle; esquema en `src/db/schema.ts`; migraciones en `drizzle/`; `.env` con `DATABASE_URL`.

## Comandos (probados)
- `pnpm dev` -> levanta cliente y servidor; servidor loguea `DrizzleQueryError` al consultar `categories`.
- `pg_isready -h localhost -p 5432` -> `no response`.
- `Get-Service *postgres*` -> `postgresql-x64-17 Stopped`.
- Binarios PG 17 disponibles en `C:\Program Files\PostgreSQL\17\bin` (psql 17.2, pg_ctl, initdb). Docker no disponible.

Verificado en: a5d5243 (2026-11-19)
