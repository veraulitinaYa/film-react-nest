# ===== BUILD FRONTEND =====
FROM node:20-alpine AS frontend-build

WORKDIR /app

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend ./frontend
RUN cd frontend && npm run build


# ===== NGINX =====
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html