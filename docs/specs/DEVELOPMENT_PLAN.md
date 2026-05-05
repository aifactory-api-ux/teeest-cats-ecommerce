# DEVELOPMENT PLAN: teeest cats ecommerce

## 1. ARCHITECTURE OVERVIEW

**Architecture:**  
- Microservicios Node.js (NestJS) para backend, PostgreSQL 15 como base de datos, Redis para caché/sesiones, React 18 (Vite) para frontend, Docker/Kubernetes para orquestación, Stripe para pagos, Auth0 para autenticación.
- API Gateway orquesta peticiones a servicios: auth, productos, carrito, pedidos, reviews, legal, contacto.
- Frontend consume APIs vía gateway, implementa UI/UX según contrato y tokens de diseño.
- Todos los modelos, DTOs y tipos compartidos se definen en `backend/shared/dtos/` y `frontend/shared/types.ts`.
- Infraestructura: docker-compose para local, cada microservicio con su Dockerfile, healthchecks, .env.example, run.sh para orquestación.

**Componentes principales:**
- **Backend:**  
  - api-gateway (NestJS, puerto 8080)
  - auth-service (NestJS, 8001)
  - product-service (NestJS, 8002)
  - cart-service (NestJS, 8003)
  - order-service (NestJS, 8004)
  - review-service (NestJS, 8005)
  - legal-service (NestJS, 8006)
  - contact-service (NestJS, 8007)
  - shared/ (DTOs, middlewares, utils)
- **Frontend:**  
  - React 18 + Vite, estructura modular por páginas y componentes UI, hooks y servicios API.
- **Infraestructura:**  
  - docker-compose.yml, .env.example, run.sh, README.md, healthchecks, readiness, Redis, PostgreSQL.

**Modelos y contratos clave:**  
- User, Product, Category, Cart, Order, Review, ContactMessage, LegalPage (ver SPEC.md §2).
- API endpoints según SPEC.md §3.
- Estructura de archivos según SPEC.md §4.

## 2. ACCEPTANCE CRITERIA

1. El sistema permite a un usuario registrarse, iniciar sesión, navegar productos, añadir al carrito, realizar checkout y ver su historial de pedidos, cumpliendo los contratos de API y UI/UX definidos.
2. Los administradores pueden gestionar productos y pedidos desde el panel de administración, con cambios reflejados en tiempo real en el frontend.
3. El despliegue local con `./run.sh` levanta todos los servicios, con healthchecks verdes, y la web es accesible en `http://localhost:8080` mostrando la tienda funcional.

---

## TEAM SCOPE (MANDATORY — PARSED BY THE PIPELINE)
- **role-tl (technical_lead):** Foundation/shared contracts
- **role-be (backend_developer):** Backend microservicios (auth, productos, carrito, pedidos, reviews, legal, contacto, gateway)
- **role-fe (frontend_developer):** Frontend React (páginas, hooks, componentes)
- **role-devops (devops_support):** Infraestructura, docker-compose, run.sh, documentación

---

## 3. EXECUTABLE ITEMS

---

### ITEM 1: Foundation — shared types, interfaces, DB schemas, config

**Goal:**  
Crear todos los contratos compartidos y utilidades base para backend y frontend:  
- DTOs y entidades TypeScript para todos los modelos (User, Product, Category, Cart, Order, Review, ContactMessage, LegalPage).
- Middlewares y utilidades compartidas (auth, paginación).
- Configuración de entorno validada y utilidades comunes.
- Contratos de frontend (interfaces TypeScript) que reflejan los DTOs backend.
- No se crean helpers ni archivos fuera de SPEC.md.

**Files to create:**
- backend/shared/dtos/user.dto.ts
- backend/shared/dtos/product.dto.ts
- backend/shared/dtos/cart.dto.ts
- backend/shared/dtos/order.dto.ts
- backend/shared/dtos/review.dto.ts
- backend/shared/dtos/category.dto.ts
- backend/shared/dtos/legal.dto.ts
- backend/shared/dtos/contact.dto.ts
- backend/shared/middlewares/auth.middleware.ts
- backend/shared/utils/pagination.util.ts
- frontend/src/shared/types.ts
- frontend/src/styles/tokens.ts

**Tests required:**
- backend/shared/tests/dto_validation.test.ts (valida DTOs y utilidades)
- frontend/tests/types.test.ts (valida tipos y contratos de datos)

**Dependencies:** None

**Validation:**  
- Ejecutar tests de DTOs y utilidades (`npm test` en backend/shared y frontend/tests).
- Revisar que todos los servicios y hooks puedan importar los tipos y utilidades sin error.

**Role:** role-tl (technical_lead)

---

### ITEM 2: Backend — Auth Service (registro, login, perfil usuario)

**Goal:**  
Implementar el microservicio de autenticación y gestión de usuarios:  
- Endpoints:  
  - POST /api/auth/register  
  - POST /api/auth/login  
  - GET /api/auth/me  
- Integración con Auth0 Node SDK para autenticación JWT.
- Validación de entrada/salida según DTOs.
- Logging estructurado, healthcheck, manejo de errores seguro.
- Dockerfile multi-stage, healthcheck, tests.

**Files to create:**
- backend/auth-service/Dockerfile
- backend/auth-service/main.ts
- backend/auth-service/app.module.ts
- backend/auth-service/auth.controller.ts
- backend/auth-service/auth.service.ts
- backend/auth-service/tests/auth.controller.test.ts
- backend/auth-service/tests/auth.service.test.ts

**Dependencies:** Item 1

**Validation:**  
- `npm run test` en backend/auth-service (tests de registro, login, perfil, errores).
- Healthcheck responde 200 en `/health`.

**Role:** role-be (backend_developer)

---

### ITEM 3: Backend — Product & Category Service (catálogo, filtros, CRUD admin)

**Goal:**  
Implementar microservicio de productos y categorías:  
- Endpoints:  
  - GET /api/products (filtros, paginación, búsqueda)
  - GET /api/products/:id
  - POST /api/products (admin)
  - PUT /api/products/:id (admin)
  - DELETE /api/products/:id (admin)
  - GET /api/categories
- Validación de entrada/salida, logging, healthcheck.
- Dockerfile multi-stage, tests.

**Files to create:**
- backend/product-service/Dockerfile
- backend/product-service/main.ts
- backend/product-service/app.module.ts
- backend/product-service/product.controller.ts
- backend/product-service/product.service.ts
- backend/product-service/tests/product.controller.test.ts
- backend/product-service/tests/product.service.test.ts

**Dependencies:** Item 1

**Validation:**  
- `npm run test` en backend/product-service (tests de CRUD, filtros, errores).
- Healthcheck responde 200 en `/health`.

**Role:** role-be (backend_developer)

---

### ITEM 4: Backend — Cart Service (gestión de carrito)

**Goal:**  
Implementar microservicio de carrito de compras:  
- Endpoints:  
  - GET /api/cart
  - POST /api/cart/items
  - PUT /api/cart/items/:productId
  - DELETE /api/cart/items/:productId
- Integración con Redis para sesiones/carritos.
- Validación, logging, healthcheck, tests.

**Files to create:**
- backend/cart-service/Dockerfile
- backend/cart-service/main.ts
- backend/cart-service/app.module.ts
- backend/cart-service/cart.controller.ts
- backend/cart-service/cart.service.ts
- backend/cart-service/tests/cart.controller.test.ts
- backend/cart-service/tests/cart.service.test.ts

**Dependencies:** Item 1

**Validation:**  
- `npm run test` en backend/cart-service (tests de añadir, actualizar, eliminar ítems, errores).
- Healthcheck responde 200 en `/health`.

**Role:** role-be (backend_developer)

---

### ITEM 5: Backend — Order Service (checkout, pagos Stripe, historial)

**Goal:**  
Implementar microservicio de pedidos y pagos:  
- Endpoints:  
  - POST /api/orders (checkout, integración Stripe)
  - GET /api/orders (historial usuario)
  - GET /api/orders/:id
- Integración con Stripe API para pagos.
- Validación, logging, healthcheck, tests.

**Files to create:**
- backend/order-service/Dockerfile
- backend/order-service/main.ts
- backend/order-service/app.module.ts
- backend/order-service/order.controller.ts
- backend/order-service/order.service.ts
- backend/order-service/tests/order.controller.test.ts
- backend/order-service/tests/order.service.test.ts

**Dependencies:** Item 1

**Validation:**  
- `npm run test` en backend/order-service (tests de checkout, pagos, historial, errores).
- Healthcheck responde 200 en `/health`.

**Role:** role-be (backend_developer)

---

### ITEM 6: Backend — Review, Legal, Contact Services

**Goal:**  
Implementar microservicios para reviews, páginas legales y contacto:  
- Review Service:  
  - GET /api/products/:productId/reviews  
  - POST /api/products/:productId/reviews  
- Legal Service:  
  - GET /api/legal/:slug  
- Contact Service:  
  - POST /api/contact  
- Validación, logging, healthcheck, tests.

**Files to create:**
- backend/review-service/Dockerfile
- backend/review-service/main.ts
- backend/review-service/app.module.ts
- backend/review-service/review.controller.ts
- backend/review-service/review.service.ts
- backend/review-service/tests/review.controller.test.ts
- backend/legal-service/Dockerfile
- backend/legal-service/main.ts
- backend/legal-service/app.module.ts
- backend/legal-service/legal.controller.ts
- backend/legal-service/legal.service.ts
- backend/legal-service/tests/legal.controller.test.ts
- backend/contact-service/Dockerfile
- backend/contact-service/main.ts
- backend/contact-service/app.module.ts
- backend/contact-service/contact.controller.ts
- backend/contact-service/contact.service.ts
- backend/contact-service/tests/contact.controller.test.ts

**Dependencies:** Item 1

**Validation:**  
- `npm run test` en cada microservicio (tests de reviews, legales, contacto).
- Healthcheck responde 200 en `/health` en cada servicio.

**Role:** role-be (backend_developer)

---

### ITEM 7: Backend — API Gateway (enrutamiento, auth, rate limiting)

**Goal:**  
Implementar API Gateway NestJS:  
- Enrutamiento a microservicios según SPEC.md.
- Middleware de autenticación JWT (Auth0), validación de roles.
- Rate limiting, logging estructurado, healthcheck.
- Dockerfile multi-stage, tests.

**Files to create:**
- backend/api-gateway/Dockerfile
- backend/api-gateway/main.ts
- backend/api-gateway/app.module.ts
- backend/api-gateway/tests/gateway.test.ts

**Dependencies:** Item 1

**Validation:**  
- `npm run test` en backend/api-gateway (tests de enrutamiento, auth, errores).
- Healthcheck responde 200 en `/health`.

**Role:** role-be (backend_developer)

---

### ITEM 8: Frontend — Core (hooks, layout, auth, API services)

**Goal:**  
Implementar la base del frontend React:  
- Hooks: useAuth, useCart, useProducts, useCategories, useOrder, useReview, useLegal, useContact.
- Servicios API: auth.ts, products.ts, cart.ts, orders.ts, reviews.ts, categories.ts, legal.ts, contact.ts.
- Layout: App.tsx, main.tsx, PageContainer.tsx, Section.tsx.
- Navbar, Footer, tokens de diseño.
- Integración Auth0 React SDK, React Query, Axios.
- Dockerfile multi-stage, tests.

**Files to create:**
- frontend/Dockerfile
- frontend/vite.config.ts
- frontend/tsconfig.json
- frontend/src/main.tsx
- frontend/src/App.tsx
- frontend/src/styles/tokens.ts
- frontend/src/components/layout/PageContainer.tsx
- frontend/src/components/layout/Section.tsx
- frontend/src/components/ui/Navbar.tsx
- frontend/src/components/ui/Footer.tsx
- frontend/src/hooks/useAuth.ts
- frontend/src/hooks/useCart.ts
- frontend/src/hooks/useProducts.ts
- frontend/src/hooks/useCategories.ts
- frontend/src/hooks/useOrder.ts
- frontend/src/hooks/useReview.ts
- frontend/src/hooks/useLegal.ts
- frontend/src/hooks/useContact.ts
- frontend/src/api/auth.ts
- frontend/src/api/products.ts
- frontend/src/api/cart.ts
- frontend/src/api/orders.ts
- frontend/src/api/reviews.ts
- frontend/src/api/categories.ts
- frontend/src/api/legal.ts
- frontend/src/api/contact.ts
- frontend/tests/hooks.test.ts
- frontend/tests/api.test.ts

**Dependencies:** Item 1

**Validation:**  
- `npm run test` en frontend (tests de hooks y servicios API).
- App renderiza layout y navegación correctamente.

**Role:** role-fe (frontend_developer)

---

### ITEM 9: Frontend — Pages & UI Components (Home, Catálogo, Producto, Carrito, Checkout, Cuenta, Admin, Legal, Contacto)

**Goal:**  
Implementar todas las páginas y componentes UI del frontend:  
- Páginas: HomePage, CategoryPage, ProductDetailPage, CartPage, CheckoutPage, UserAccountPage, ContactPage, PrivacyPage, TermsPage, CookiesPage, AdminDashboardPage, AdminProductsPage, AdminOrdersPage, AdminCustomersPage, AdminContentPage.
- Componentes UI: Badge, Tag, ProgressBar, ExportButton, Chip, Switch, Checkbox, PrimaryButton, SecondaryButton, TextField, ProductCard, Modal, QuantitySelector, StarRating, Breadcrumb, Pagination, FilterAccordion, NewsletterForm.
- Cumplimiento estricto de tokens y estructura UI/UX aprobada.
- Tests de renderizado y funcionalidad.

**Files to create:**
- frontend/src/pages/HomePage.tsx
- frontend/src/pages/CategoryPage.tsx
- frontend/src/pages/ProductDetailPage.tsx
- frontend/src/pages/CartPage.tsx
- frontend/src/pages/CheckoutPage.tsx
- frontend/src/pages/UserAccountPage.tsx
- frontend/src/pages/ContactPage.tsx
- frontend/src/pages/PrivacyPage.tsx
- frontend/src/pages/TermsPage.tsx
- frontend/src/pages/CookiesPage.tsx
- frontend/src/pages/AdminDashboardPage.tsx
- frontend/src/pages/AdminProductsPage.tsx
- frontend/src/pages/AdminOrdersPage.tsx
- frontend/src/pages/AdminCustomersPage.tsx
- frontend/src/pages/AdminContentPage.tsx
- frontend/src/components/ui/Badge.tsx
- frontend/src/components/ui/Tag.tsx
- frontend/src/components/ui/ProgressBar.tsx
- frontend/src/components/ui/ExportButton.tsx
- frontend/src/components/ui/Chip.tsx
- frontend/src/components/ui/Switch.tsx
- frontend/src/components/ui/Checkbox.tsx
- frontend/src/components/ui/PrimaryButton.tsx
- frontend/src/components/ui/SecondaryButton.tsx
- frontend/src/components/ui/TextField.tsx
- frontend/src/components/ui/ProductCard.tsx
- frontend/src/components/ui/Modal.tsx
- frontend/src/components/ui/QuantitySelector.tsx
- frontend/src/components/ui/StarRating.tsx
- frontend/src/components/ui/Breadcrumb.tsx
- frontend/src/components/ui/Pagination.tsx
- frontend/src/components/ui/FilterAccordion.tsx
- frontend/src/components/ui/NewsletterForm.tsx
- frontend/tests/pages.test.tsx
- frontend/tests/components.test.tsx

**Dependencies:** Item 1, Item 8

**Validation:**  
- `npm run test` en frontend (tests de páginas y componentes).
- Navegación y renderizado de todas las páginas y componentes según UI/UX.

**Role:** role-fe (frontend_developer)

---

### ITEM 10: Infrastructure & Deployment

**Goal:**  
Orquestar todos los servicios y frontend para despliegue local y CI/CD:  
- docker-compose.yml con todos los servicios, healthchecks, depends_on.
- .env.example con todas las variables necesarias y ejemplos.
- .gitignore y .dockerignore para excluir archivos sensibles y temporales.
- run.sh para levantar todo el stack, esperar healthchecks y mostrar URL.
- README.md con instrucciones de uso, endpoints y troubleshooting.
- docs/architecture.md con diagrama y descripción de componentes.

**Files to create:**
- docker-compose.yml
- .env.example
- .gitignore
- .dockerignore
- run.sh
- README.md
- docs/architecture.md

**Dependencies:** Items 1–9

**Validation:**  
- Ejecutar `./run.sh` en limpio: todos los servicios healthy, web accesible, endpoints funcionales.
- README.md cubre setup, troubleshooting y endpoints principales.

**Role:** role-devops (devops_support)

---