#!/bin/bash

set -e

echo "Starting teeest cats ecommerce platform..."

echo "Building and starting all services..."
docker-compose up -d --build

echo "Waiting for services to be healthy..."
sleep 10

echo "Checking service health..."
docker-compose ps

echo ""
echo "=========================================="
echo "  teeest cats ecommerce is running!"
echo "=========================================="
echo ""
echo "  Frontend:   http://localhost:5173"
echo "  API Gateway: http://localhost:8080"
echo "  Auth Service: http://localhost:8001"
echo "  Product Service: http://localhost:8002"
echo "  Cart Service: http://localhost:8003"
echo "  Order Service: http://localhost:8004"
echo "  Review Service: http://localhost:8005"
echo "  Legal Service: http://localhost:8006"
echo "  Contact Service: http://localhost:8007"
echo "  PostgreSQL: localhost:5432"
echo "  Redis: localhost:6379"
echo ""
echo "=========================================="
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop services: docker-compose down"
echo "To remove everything: docker-compose down -v"
echo ""