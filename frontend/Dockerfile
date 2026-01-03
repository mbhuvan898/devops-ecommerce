FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build


FROM nginx:alpine

# Install envsubst (needed for runtime env injection)
RUN apk add --no-cache gettext

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend
COPY --from=build /app/build /usr/share/nginx/html

# Copy env template
COPY env.template.js /usr/share/nginx/html/env.template.js

# Replace env vars at container start
CMD sh -c "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js && nginx -g 'daemon off;'"

EXPOSE 80
