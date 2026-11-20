# Requisitos

## Fase 2 — Modo demo estático para Vercel

### Unidad única — client + config root
- [ ] Modo demo explícito por `VITE_DEMO_MODE=true` (leído con `import.meta.env.VITE_DEMO_MODE`). Sin DB, sin backend, sin fetch.
- [ ] Seed en memoria: categorías y suscripciones de ejemplo, IDs numéricos, types `Category`/`Subscription` sin cambios.
- [ ] Adaptador de datos: si demo → seed + mutaciones sobre estado local React (sin persistencia); si no → API actual.
- [ ] Las 5 rutas API del client pasan por el adaptador; se corrigen los URLs hardcodeados `http://localhost:3000` para usar `API_URL`.
- [ ] Fix colateral autorizado: `CategoryDialog.tsx:33` genera `id` numérico (no `crypto.randomUUID()`).
- [ ] `vercel.json` en root: build estático del client (`apps/client/dist`), SPA fallback a `index.html`.
- [ ] Demo NO se activa en local por DB caída: el aviso del PR #1 sigue vigente.

## Contratos congelados
- Flag: `import.meta.env.VITE_DEMO_MODE === "true"` → modo demo. Cualquier otro valor → modo API.
- Demo: `getCategories()` / `getSubscriptions()` devuelven arrays seed sin fetch; mutaciones (`createSubscription`, `editSubscription`, `deleteSubscription`, alta de categoría) actualizan estado en memoria y devuelven el objeto creado/editado.
- Tipos: `Category = { id: number; name: string; color: string }`; `Subscription = { id: number; title: string; price: number; categoryId: number; nextRenewal: Date; isRenews?: boolean }`. Sin cambios.
- API mode: contrato 503 `{ error, code: "DATABASE_UNAVAILABLE" }` del PR #1 intacto; `DatabaseUnavailableError` intacta.
- Dependencias: ninguna nueva. Sin tocar `pnpm-lock.yaml`.
- UI strings en inglés. Tokens de `DESIGN.md`; sin hex/px nuevos.

## Fase 3 — CRUD local con aviso de DB (2026-11-20)

- [ ] En local con DB caída (503 `DATABASE_UNAVAILABLE`): el aviso del sidebar aparece y permanece, y el CRUD sigue funcionando contra el store en memoria de `demo.ts`.
- [ ] En Vercel demo (`VITE_DEMO_MODE=true`): comportamiento actual, **sin** aviso (no hay DB que diagnosticar).
- [ ] Con DB sana en local: API real, sin aviso, sin cambios.
- [ ] Persistencia: solo en memoria. Se pierde al recargar; la recarga vuelve a detectar el estado real de la DB.
- [ ] El flag de fallback se activa en la capa API al recibir el 503; la UI lo refleja. Sin reintentos de fetch una vez activo.

### Contratos congelados (Fase 3)
- Flag de demo: `import.meta.env.VITE_DEMO_MODE === "true"` — sin cambios.
- Flag de fallback: variable module-level en `apps/client/src/features/subscriptions/api/localFallback.ts`; arranca `false` en cada carga de página; no se persiste.
- Las 5 funciones de API chequean `IS_DEMO_MODE || isLocalFallback()` al entrar y despachan al store de `demo.ts`.
- 503 con `body.code === "DATABASE_UNAVAILABLE"` en cualquier ruta → activar fallback y satisfacer esa llamada desde el store demo (lectura → seed; mutación → resultado demo). Sin throw en las rutas de mutación.
- `getCategories` conserva la exportación `DatabaseUnavailableError` y sigue lanzándola en el primer 503; la página marca el aviso y recarga categorías desde el store ya activo.
- Sidebar: avatar/alerta `role="alert"` intacta; además se muestra la lista de categorías debajo para no perder el filtrado.
- Tipos, estilos y dependencias: sin cambios. UI strings en inglés.

Verificado en: 22b3de9 (2026-11-20)
