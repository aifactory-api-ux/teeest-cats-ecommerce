FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY shared ./shared
COPY product-service ./product-service
WORKDIR /app/product-service
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/product-service/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
EXPOSE 8002
CMD ["node", "dist/main.js"]