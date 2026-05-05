FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY shared ./shared
COPY legal-service ./legal-service
WORKDIR /app/legal-service
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/legal-service/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
EXPOSE 8006
CMD ["node", "dist/main.js"]