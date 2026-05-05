FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY shared ./shared
COPY order-service ./order-service
RUN cd order-service && npx tsc --project tsconfig.json

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/order-service/dist ./dist
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
EXPOSE 8004
CMD ["node", "dist/main.js"]