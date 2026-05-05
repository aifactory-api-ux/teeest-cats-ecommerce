# SPEC.md

## 1. TECHNOLOGY STACK

**Backend:**
- Node.js v20.11.1
- NestJS v10.2.5
- PostgreSQL 15
- Redis 7
- Stripe API v2024-04-10
- Auth0 Node SDK v3.0.0

**Frontend:**
- React 18.2.0
- Vite 5.2.0
- TypeScript 5.4.x
- React Router DOM 6.23.0
- Styled Components 6.1.0
- Axios 1.6.8
- React Query 5.0.0
- Auth0 React SDK 2.0.0

**Infrastructure:**
- Docker 24.x
- docker-compose 2.x
- Kubernetes 1.29.x
- Helm 3.x

**CI/CD:**
- GitHub Actions

---

## 2. DATA CONTRACTS

### Backend (NestJS/TypeScript DTOs & Entities)

#### User

```typescript
export interface User {
  id: string; // UUID
  email: string;
  name: string;
  passwordHash: string;
  avatarUrl?: string;
  address: string;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}
```

#### Product

```typescript
export interface Product {
  id: string; // UUID
  name: string;
  description: string;
  price: number; // cents
  imageUrl: string;
  category: string;
  brand: string;
  stock: number;
  rating: number; // 0-5
  reviewCount: number;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}
```

#### Category

```typescript
export interface Category {
  id: string; // UUID
  name: string;
  description: string;
  imageUrl: string;
}
```

#### CartItem

```typescript
export interface CartItem {
  productId: string;
  quantity: number;
}
```

#### Cart

```typescript
export interface Cart {
  id: string; // UUID
  userId: string;
  items: CartItem[];
  updatedAt: string; // ISO8601
}
```

#### Order

```typescript
export interface Order {
  id: string; // UUID
  userId: string;
  items: CartItem[];
  total: number; // cents
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentIntentId: string;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}
```

#### Review

```typescript
export interface Review {
  id: string; // UUID
  productId: string;
  userId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO8601
}
```

#### ContactMessage

```typescript
export interface ContactMessage {
  id: string; // UUID
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO8601
}
```

#### LegalPage

```typescript
export interface LegalPage {
  slug: string;
  title: string;
  content: string;
  updatedAt: string; // ISO8601
}
```

### Frontend (TypeScript interfaces)

All frontend interfaces mirror backend contracts exactly.

---

## 3. API ENDPOINTS

### Auth

- **POST /api/auth/register**
  - Request: `{ email: string; name: string; password: string; address: string }`
  - Response: `{ id: string; email: string; name: string; avatarUrl?: string; address: string; createdAt: string; updatedAt: string }`

- **POST /api/auth/login**
  - Request: `{ email: string; password: string }`
  - Response: `{ accessToken: string; refreshToken: string; user: User }`

- **GET /api/auth/me**
  - Auth: Bearer
  - Response: `User`

### Products

- **GET /api/products**
  - Query: `?category?&brand?&minPrice?&maxPrice?&sort?&page?&limit?`
  - Response: `{ products: Product[]; total: number; page: number; limit: number }`

- **GET /api/products/:id**
  - Response: `Product`

- **POST /api/products** (admin)
  - Body: `Product` (without id, createdAt, updatedAt)
  - Response: `Product`

- **PUT /api/products/:id** (admin)
  - Body: `Partial<Product>`
  - Response: `Product`

- **DELETE /api/products/:id** (admin)
  - Response: `{ success: boolean }`

### Categories

- **GET /api/categories**
  - Response: `Category[]`

### Cart

- **GET /api/cart**
  - Auth: Bearer
  - Response: `Cart`

- **POST /api/cart/items**
  - Auth: Bearer
  - Body: `{ productId: string; quantity: number }`
  - Response: `Cart`

- **PUT /api/cart/items/:productId**
  - Auth: Bearer
  - Body: `{ quantity: number }`
  - Response: `Cart`

- **DELETE /api/cart/items/:productId**
  - Auth: Bearer
  - Response: `Cart`

### Orders

- **POST /api/orders**
  - Auth: Bearer
  - Body: `{ shippingAddress: string; paymentMethod: 'stripe' }`
  - Response: `Order`

- **GET /api/orders**
  - Auth: Bearer
  - Response: `Order[]`

- **GET /api/orders/:id**
  - Auth: Bearer
  - Response: `Order`

### Reviews

- **GET /api/products/:productId/reviews**
  - Response: `Review[]`

- **POST /api/products/:productId/reviews**
  - Auth: Bearer
  - Body: `{ rating: number; comment: string }`
  - Response: `Review`

### Contact

- **POST /api/contact**
  - Body: `{ name: string; email: string; message: string }`
  - Response: `ContactMessage`

### Legal Pages

- **GET /api/legal/:slug**
  - Response: `LegalPage`

---

## 4. FILE STRUCTURE

### PORT TABLE

| Service              | Listening Port | Path                        |
|----------------------|---------------|-----------------------------|
| api-gateway          | 8080          | backend/api-gateway/        |
| auth-service         | 8001          | backend/auth-service/       |
| product-service      | 8002          | backend/product-service/    |
| cart-service         | 8003          | backend/cart-service/       |
| order-service        | 8004          | backend/order-service/      |
| review-service       | 8005          | backend/review-service/     |
| legal-service        | 8006          | backend/legal-service/      |
| contact-service      | 8007          | backend/contact-service/    |

### SHARED MODULES

| Shared path         | Imported by services                                      |
|---------------------|----------------------------------------------------------|
| backend/shared/     | auth-service, product-service, cart-service, order-service, review-service, legal-service, contact-service, api-gateway |

### FILE TREE

```
.
├── docker-compose.yml                # Multi-service orchestration
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
├── README.md                         # Project documentation
├── run.sh                            # Root startup script
├── backend/
│   ├── shared/                       # Shared DTOs, utils, middlewares
│   │   ├── dtos/
│   │   │   ├── user.dto.ts
│   │   │   ├── product.dto.ts
│   │   │   ├── cart.dto.ts
│   │   │   ├── order.dto.ts
│   │   │   ├── review.dto.ts
│   │   │   ├── category.dto.ts
│   │   │   ├── legal.dto.ts
│   │   │   └── contact.dto.ts
│   │   ├── middlewares/
│   │   │   └── auth.middleware.ts
│   │   └── utils/
│   │       └── pagination.util.ts
│   ├── api-gateway/
│   │   ├── Dockerfile
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── ...
│   ├── auth-service/
│   │   ├── Dockerfile
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── ...
│   ├── product-service/
│   │   ├── Dockerfile
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── product.controller.ts
│   │   ├── product.service.ts
│   │   └── ...
│   ├── cart-service/
│   │   ├── Dockerfile
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── cart.controller.ts
│   │   ├── cart.service.ts
│   │   └── ...
│   ├── order-service/
│   │   ├── Dockerfile
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── order.controller.ts
│   │   ├── order.service.ts
│   │   └── ...
│   ├── review-service/
│   │   ├── Dockerfile
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── review.controller.ts
│   │   ├── review.service.ts
│   │   └── ...
│   ├── legal-service/
│   │   ├── Dockerfile
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── legal.controller.ts
│   │   ├── legal.service.ts
│   │   └── ...
│   ├── contact-service/
│   │   ├── Dockerfile
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── contact.controller.ts
│   │   ├── contact.service.ts
│   │   └── ...
│   └── ...
├── frontend/
│   ├── Dockerfile
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.svg
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── styles/
│   │   │   └── tokens.ts           # Design tokens (colors, typography, spacing, radii, shadows)
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── CategoryPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── UserAccountPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── PrivacyPage.tsx
│   │   │   ├── TermsPage.tsx
│   │   │   ├── CookiesPage.tsx
│   │   │   ├── AdminDashboardPage.tsx
│   │   │   ├── AdminProductsPage.tsx
│   │   │   ├── AdminOrdersPage.tsx
│   │   │   ├── AdminCustomersPage.tsx
│   │   │   └── AdminContentPage.tsx
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Tag.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── ExportButton.tsx
│   │   │   │   ├── Chip.tsx
│   │   │   │   ├── Switch.tsx
│   │   │   │   ├── Checkbox.tsx
│   │   │   │   ├── PrimaryButton.tsx
│   │   │   │   ├── SecondaryButton.tsx
│   │   │   │   ├── TextField.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── QuantitySelector.tsx
│   │   │   │   ├── StarRating.tsx
│   │   │   │   ├── Breadcrumb.tsx
│   │   │   │   ├── Pagination.tsx
│   │   │   │   ├── FilterAccordion.tsx
│   │   │   │   └── NewsletterForm.tsx
│   │   │   ├── layout/
│   │   │   │   ├── PageContainer.tsx
│   │   │   │   └── Section.tsx
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useCart.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useCategories.ts
│   │   │   ├── useOrder.ts
│   │   │   ├── useReview.ts
│   │   │   ├── useLegal.ts
│   │   │   └── useContact.ts
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   ├── cart.ts
│   │   │   ├── orders.ts
│   │   │   ├── reviews.ts
│   │   │   ├── categories.ts
│   │   │   ├── legal.ts
│   │   │   └── contact.ts
│   │   └── types/
│   │       ├── user.ts
│   │       ├── product.ts
│   │       ├── cart.ts
│   │       ├── order.ts
│   │       ├── review.ts
│   │       ├── category.ts
│   │       ├── legal.ts
│   │       └── contact.ts
└── ...
```

---

## 5. ENVIRONMENT VARIABLES

| Name                        | Type   | Description                                      | Example Value                       |
|-----------------------------|--------|--------------------------------------------------|-------------------------------------|
| NODE_ENV                    | string | Node environment                                 | production                          |
| PORT                        | number | Service listening port                           | 8001                                |
| DATABASE_URL                | string | PostgreSQL connection string                     | postgres://user:pass@db:5432/cats   |
| REDIS_URL                   | string | Redis connection string                          | redis://redis:6379                  |
| JWT_SECRET                  | string | JWT signing secret (Auth)                        | supersecretkey                      |
| AUTH0_DOMAIN                | string | Auth0 domain                                     | dev-abc123.us.auth0.com             |
| AUTH0_CLIENT_ID             | string | Auth0 client ID                                  | 123abcDEF456                        |
| AUTH0_CLIENT_SECRET         | string | Auth0 client secret                              | s3cr3t                              |
| STRIPE_SECRET_KEY           | string | Stripe API secret key                            | sk_test_51H...                      |
| STRIPE_WEBHOOK_SECRET       | string | Stripe webhook signing secret                    | whsec_...                           |
| FRONTEND_URL                | string | Public frontend URL                              | https://cats-ecommerce.com          |
| SESSION_SECRET              | string | Session encryption secret                        | anothersecret                       |
| ADMIN_EMAIL                 | string | Admin notification email                         | admin@cats-ecommerce.com            |
| SENDGRID_API_KEY            | string | SendGrid API key for transactional emails        | SG.xxxxxxxx                         |
| CLOUDINARY_URL              | string | Cloudinary image hosting URL                     | cloudinary://...                    |

---

## 6. IMPORT CONTRACTS

### Backend

- `from backend/shared/dtos/user.dto import User`
- `from backend/shared/dtos/product.dto import Product`
- `from backend/shared/dtos/cart.dto import Cart, CartItem`
- `from backend/shared/dtos/order.dto import Order`
- `from backend/shared/dtos/review.dto import Review`
- `from backend/shared/dtos/category.dto import Category`
- `from backend/shared/dtos/legal.dto import LegalPage`
- `from backend/shared/dtos/contact.dto import ContactMessage`
- `from backend/shared/middlewares/auth.middleware import AuthMiddleware`
- `from backend/shared/utils/pagination.util import paginate`

### Frontend

- `import { User } from '../types/user'`
- `import { Product } from '../types/product'`
- `import { Cart, CartItem } from '../types/cart'`
- `import { Order } from '../types/order'`
- `import { Review } from '../types/review'`
- `import { Category } from '../types/category'`
- `import { LegalPage } from '../types/legal'`
- `import { ContactMessage } from '../types/contact'`
- `import { BadgeProps } from '../components/ui/Badge'`
- `import { TagProps } from '../components/ui/Tag'`
- `import { ProgressBarProps } from '../components/ui/ProgressBar'`
- `import { ExportButtonProps } from '../components/ui/ExportButton'`
- `import { ChipProps } from '../components/ui/Chip'`
- `import { SwitchProps } from '../components/ui/Switch'`
- `import { CheckboxProps } from '../components/ui/Checkbox'`
- `import { PrimaryButtonProps } from '../components/ui/PrimaryButton'`
- `import { SecondaryButtonProps } from '../components/ui/SecondaryButton'`
- `import { TextFieldProps } from '../components/ui/TextField'`
- `import { ProductCardProps } from '../components/ui/ProductCard'`
- `import { NavbarProps } from '../components/ui/Navbar'`
- `import { FooterProps } from '../components/ui/Footer'`
- `import { ModalProps } from '../components/ui/Modal'`
- `import { QuantitySelectorProps } from '../components/ui/QuantitySelector'`
- `import { StarRatingProps } from '../components/ui/StarRating'`
- `import { BreadcrumbProps } from '../components/ui/Breadcrumb'`
- `import { PaginationProps } from '../components/ui/Pagination'`
- `import { FilterAccordionProps } from '../components/ui/FilterAccordion'`
- `import { NewsletterFormProps } from '../components/ui/NewsletterForm'`

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### State Hooks

- `useAuth() → { user: User | null, loading: boolean, error: string | null, login: (email: string, password: string) => Promise<void>, logout: () => void, register: (data: { email: string; name: string; password: string; address: string }) => Promise<void> }`
- `useCart() → { cart: Cart | null, loading: boolean, error: string | null, addItem: (productId: string, quantity: number) => Promise<void>, updateItem: (productId: string, quantity: number) => Promise<void>, removeItem: (productId: string) => Promise<void>, clearCart: () => Promise<void> }`
- `useProducts() → { products: Product[], loading: boolean, error: string | null, fetchProducts: (params?: ProductQueryParams) => Promise<void> }`
- `useCategories() → { categories: Category[], loading: boolean, error: string | null }`
- `useOrder() → { orders: Order[], loading: boolean, error: string | null, createOrder: (data: { shippingAddress: string; paymentMethod: 'stripe' }) => Promise<Order> }`
- `useReview(productId: string) → { reviews: Review[], loading: boolean, error: string | null, addReview: (data: { rating: number; comment: string }) => Promise<void> }`
- `useLegal(slug: string) → { page: LegalPage | null, loading: boolean, error: string | null }`
- `useContact() → { sendMessage: (data: { name: string; email: string; message: string }) => Promise<ContactMessage>, loading: boolean, error: string | null }`

### UI Component Props

- `BadgeProps: { label: string; variant?: 'default'|'success'|'warning'|'error'; size?: 'sm'|'md' }`
- `TagProps: { text: string; color?: string; onRemove?: () => void }`
- `ProgressBarProps: { value: number; max?: number; label?: string; color?: string }`
- `ExportButtonProps: { onClick: () => void; label?: string; disabled?: boolean; loading?: boolean }`
- `ChipProps: { label: string; color?: string; onClick?: () => void }`
- `SwitchProps: { checked: boolean; onChange: (checked: boolean) => void; label?: string }`
- `CheckboxProps: { checked: boolean; onChange: (checked: boolean) => void; label?: string }`
- `PrimaryButtonProps: { children: React.ReactNode; onClick: () => void; disabled?: boolean; loading?: boolean }`
- `SecondaryButtonProps: { children: React.ReactNode; onClick: () => void; disabled?: boolean; loading?: boolean }`
- `TextFieldProps: { value: string; onChange: (value: string) => void; label?: string; placeholder?: string; type?: string; error?: string }`
- `ProductCardProps: { product: Product; onAddToCart: (productId: string) => void }`
- `NavbarProps: { user: User | null; cartCount: number; onLogout: () => void }`
- `FooterProps: { }`
- `ModalProps: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }`
- `QuantitySelectorProps: { value: number; min?: number; max?: number; onChange: (value: number) => void }`
- `StarRatingProps: { value: number; onChange?: (value: number) => void; readOnly?: boolean }`
- `BreadcrumbProps: { items: { label: string; href: string }[] }`
- `PaginationProps: { page: number; total: number; pageSize: number; onPageChange: (page: number) => void }`
- `FilterAccordionProps: { filters: FilterOption[]; selected: string[]; onChange: (selected: string[]) => void }`
- `NewsletterFormProps: { onSubmit: (email: string) => void; loading: boolean; error?: string }`

---

## 8. FILE EXTENSION CONVENTION

- All frontend files use `.tsx` (TypeScript React).
- The project is TypeScript throughout (frontend and backend).
- Entry point: `/src/main.tsx` (as referenced in `public/index.html` via `<script type="module" src="/src/main.tsx"></script>`)
- No `.jsx` or `.js` files in frontend source; all React components are `.tsx`.
- All backend source files are `.ts`.

---