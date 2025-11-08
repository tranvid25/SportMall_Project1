### Stage 1: build React app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
# Do not set CI=true here. Create React App treats warnings as errors when
# CI=true which will fail Docker builds on lint warnings. Keep CI unset so
# build completes even when only warnings are present.
RUN npm run build

### Stage 2: serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
