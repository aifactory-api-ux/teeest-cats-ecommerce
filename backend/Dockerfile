FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080 8001 8002 8003 8004 8005 8006 8007
CMD ["node", "dist/api-gateway/main.js"]