FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY shared ./shared
COPY order-service ./order-service
COPY tsconfig.json ./
RUN npx tsc -p tsconfig.json --outDir ./dist

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
EXPOSE 8004
CMD ["node", "dist/order-service/main.js"]