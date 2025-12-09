FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

EXPOSE 3000

# Required for React Hot Reload inside Docker
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "start"]

