FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy frontend code
COPY . .

EXPOSE 3000

# Required for React Hot Reload inside Docker
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "start"]

