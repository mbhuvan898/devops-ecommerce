FROM node:20-alpine

WORKDIR /app

# Pass backend API URL
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
