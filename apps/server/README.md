# 📝 **Subscription Manager API**

## 📌 **Descripción**

**Subscription Manager API** es una **API REST** moderna, tipada y escalable, construida con:

- **Node.js + Express**
- **TypeScript**
- **Drizzle ORM**
- **PostgreSQL**
- **Zod** para validación
- **Pino** para logging estructurado

Es una **API REST**, no RESTful/RESTfull estricta, porque:

- Cumple los principios REST (Recursos, métodos HTTP, stateless)
- Usa JSON como formato de intercambio
- Mantiene endpoints basados en recursos
  ➡ Pero **no implementa HATEOAS**, requisito para ser RESTfully completa.
  Por eso la categoría correcta es:

> ✅ **API REST (estándar)**
> ❌ No una API RESTful estricta

---

## 🚀 **Características principales**

- CRUD completo de **suscripciones** y **categorías**
- Validación estricta con **Zod**
- Consultas seguras y tipadas con **Drizzle**
- Logs detallados con **Pino**
- Manejo centralizado de errores (planificado)
- Preparada para expansión hacia:

  - Autenticación con JWT
  - Cookies HTTP Only
  - Redis como cache, rate-limit o blacklist

---

## 📂 **Estructura del proyecto**

```
src/
 ├── db/
 │    ├── schema.ts        # Tablas de Drizzle
 │    └── drizzle.config.ts
 ├── validators/
 │    └── schema.ts        # Validaciones Zod
 ├── middlewares/
 │    ├── validate.ts       # (pendiente)
 │    └── auth.ts (futuro)
 ├── routes/
 │    ├── subscriptions.ts
 │    └── categories.ts
 ├── utils/
 │    └── formatDate.ts (futuro)
 └── index.ts               # Servidor principal
```

---

## 🛠 **Tecnologías**

| Tecnología               | Uso                         |
| ------------------------ | --------------------------- |
| **Express**              | Routing y servidor HTTP     |
| **TypeScript**           | Tipado estático             |
| **Zod**                  | Validación y parseo seguro  |
| **Drizzle ORM**          | ORM ligero, rápido y tipado |
| **PostgreSQL**           | Persistencia principal      |
| **Pino**                 | Logging estructurado        |
| **dotenv**               | Variables de entorno        |
| **CORS**                 | Control de orígenes         |
| **Redis** (próximamente) | Cache / Session store       |

---

## ⚙️ **Instalación**

### 1️⃣ Clona el repositorio

```bash
git clone https://github.com/tuusuario/subscription-api.git
cd subscription-api
```

### 2️⃣ Instala dependencias

```bash
pnpm install
```

### 3️⃣ Crea el archivo `.env`

```
DATABASE_URL=postgres://user:pass@localhost:5432/subscription_manager
PORT=3000
JWT_SECRET=super-secret
```

---

## 🧱 **Migraciones (Drizzle)**

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit push
```

---

## ▶️ **Ejecutar en desarrollo**

```bash
pnpm dev
```

---

## 🔌 **Endpoints principales**

### 📍 **Subscriptions**

| Method | Endpoint             | Descripción   |
| ------ | -------------------- | ------------- |
| GET    | `/subscriptions`     | Obtener todas |
| POST   | `/subscriptions`     | Crear         |
| PATCH  | `/subscriptions/:id` | Actualizar    |
| DELETE | `/subscriptions/:id` | Eliminar      |

### 📍 **Categories**

| Method | Endpoint          | Descripción   |
| ------ | ----------------- | ------------- |
| GET    | `/categories`     | Obtener todas |
| POST   | `/categories`     | Crear         |
| PATCH  | `/categories/:id` | Actualizar    |
| DELETE | `/categories/:id` | Eliminar      |

---

## 🧪 **Validación (Zod)**

Todos los datos entrantes son validados con los schemas de:

```
/validators/schema.ts
```

Esto asegura:

- Formatos correctos (`YYYY-MM-DD`)
- Tipos correctos
- Transformaciones seguras
- Errores amigables para el cliente

---

## 📘 **Roadmap del proyecto**

### ✔ Fase 1 — Base del proyecto

- [x] Servidor Express
- [x] Drizzle ORM + PostgreSQL
- [x] Zod para validar datos
- [x] CRUD de suscripciones
- [x] CRUD de categorías
- [x] Logger con Pino

---

### 🚧 Fase 2 — Seguridad y autenticación

- [ ] Registro de usuario
- [ ] Login
- [ ] JWT Access Tokens
- [ ] Refresh Tokens
- [ ] Middleware `authRequired`

---

### 🚧 Fase 3 — Estabilidad y escalabilidad OPCIONAL

- [ ] Middleware global de errores
- [ ] Rate limiting
- [ ] Sanitización anti-XSS
- [ ] Redis para cache
- [ ] Redis para rate-limit
- [ ] Redis para invalidación de tokens

---

### 🚧 Fase 4 — Calidad de código OPCIONAL

- [ ] Tests unitarios (Zod, helpers)
- [ ] Tests de integración (rutas)
- [ ] Tests E2E con Supertest

---

### 🚧 Fase 5 — Entorno profesional OPCIONAL

- [ ] Dockerfile
- [ ] docker-compose (postgres + redis)
- [ ] CI/CD (GitHub Actions)

---

## 🧑‍💻 **Autor**

Desarrollado por **Jonathan (mminn)**.

Siéntete libre de mejorar, extender o versionar esta API.

---

## 📄 **Licencia**

MIT License.
