FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY shared ./shared
COPY auth-service ./auth-service
WORKDIR /app/auth-service
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/auth-service/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
EXPOSE 8001
CMD ["node", "dist/main.js"]