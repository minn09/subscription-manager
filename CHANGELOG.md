# Subscription Tracker

- Stack
  - Frontend: TailwindCSS, shadcn, RHF (React Hook Form), Zustand, Tanstack Query
  - Backend: Express, Pino-logger, Drizzle, PostgreSQL, Redis
    - Tecnologias: CORS, Cookies, JWT
    - Docs: Scalar
  - DevOps: Docker, Git/GitHub, Sentry
  - Both: zod, TypeScript

- Features:
- [x] CRUD suscripciones (nombre, precio, fecha renovación, categoría)
- [ ] Crear la funcionalidad de login simple en backend y usarla en el frontend
- [x] Dashboard con cards
- [x] Cálculo gastos mensuales/anuales
- [x] Notificaciones de renovación (7 días antes)
- [x] Filtros por categoría y búsqueda
- [ ] Persistencia con base de datos y con localStorage (on/off de cada una)
- [ ] Implementar para el backend la funcion de detectar si el puerto que tiene existe sino que use otro para que se pueda servir
- Extra: Exportar/Importar JSON, calendario mensual, dark mode
