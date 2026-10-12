# --------------------------------------------------
# Stage 1: Build Stage
# --------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./

# Install all dependencies (clean install)
RUN npm install

# Copy source code and assets
COPY . .

# Build production bundle
RUN npm run build

# --------------------------------------------------
# Stage 2: Production Nginx Server Stage
# --------------------------------------------------
FROM nginx:alpine AS runner

# Remove default nginx html files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard HTTP port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
