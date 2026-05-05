# teeest cats ecommerce

A full-stack microservices-based e-commerce application built with NestJS backend, React frontend, PostgreSQL, Redis, and Docker.

## Architecture

- **Backend**: 8 NestJS microservices
  - API Gateway (port 8080)
  - Auth Service (port 8001)
  - Product Service (port 8002)
  - Cart Service (port 8003)
  - Order Service (port 8004)
  - Review Service (port 8005)
  - Legal Service (port 8006)
  - Contact Service (port 8007)

- **Frontend**: React 18 + Vite + TypeScript
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Authentication**: JWT-based with Auth0

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20.x (for local development)

### Running with Docker

```bash
# Make the run script executable
chmod +x run.sh

# Start all services
./run.sh
```

This will build and start all services. The frontend will be available at http://localhost:5173

### Running Locally

```bash
# Start infrastructure
docker-compose up -d postgres redis

# Install backend dependencies
cd backend
npm install

# Start each service
cd auth-service && npm run start:dev
cd product-service && npm run start:dev
# ... etc

# Install frontend dependencies
cd frontend
npm install
npm run dev
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| frontend | 5173 | React SPA |
| api-gateway | 8080 | Main entry point |
| auth-service | 8001 | Authentication & users |
| product-service | 8002 | Products & categories |
| cart-service | 8003 | Shopping cart (Redis) |
| order-service | 8004 | Orders & checkout |
| review-service | 8005 | Product reviews |
| legal-service | 8006 | Legal pages |
| contact-service | 8007 | Contact form |

## API Endpoints

### Auth
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Products
- GET `/api/products` - List products (with filters)
- GET `/api/products/:id` - Get product details
- POST/PUT/DELETE `/api/products/:id` - Admin CRUD

### Categories
- GET `/api/categories` - List all categories

### Cart
- GET `/api/cart` - Get user's cart
- POST `/api/cart/items` - Add item to cart
- PUT `/api/cart/items/:productId` - Update quantity
- DELETE `/api/cart/items/:productId` - Remove item

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders` - Get order history
- GET `/api/orders/:id` - Get order details

### Reviews
- GET `/api/products/:productId/reviews` - Get reviews
- POST `/api/products/:productId/reviews` - Add review

### Contact
- POST `/api/contact` - Submit contact form

### Legal
- GET `/api/legal/:slug` - Get legal page

## Environment Variables

See `.env.example` for all required environment variables.

## Development

### Backend Structure

```
backend/
├── shared/           # Shared DTOs, utils, middlewares
├── api-gateway/      # Main gateway service
├── auth-service/     # Authentication
├── product-service/  # Products & categories
├── cart-service/     # Cart management
├── order-service/    # Orders & checkout
├── review-service/   # Reviews
├── legal-service/    # Legal pages
└── contact-service/ # Contact form
```

### Frontend Structure

```
frontend/
├── src/
│   ├── api/          # API service functions
│   ├── components/    # UI components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── styles/        # Design tokens
│   └── types/         # TypeScript interfaces
└── public/           # Static assets
```

## Troubleshooting

### Services not starting
```bash
# Check Docker status
docker-compose ps

# View logs
docker-compose logs [service-name]

# Restart services
docker-compose restart [service-name]
```

### Database connection issues
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres
```

### Frontend not loading
```bash
# Check API gateway health
curl http://localhost:8080/health

# Check if services are running
docker-compose ps
```

## License

MIT