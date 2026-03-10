# Use official Node runtime
FROM node:18-alpine

WORKDIR /app

# Install dependencies first (leverage docker cache)
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --production

# Copy source
COPY src ./src

# Expose port
EXPOSE 4000

# Default env (overridden in k8s)
ENV PORT=4000
CMD ["node", "src/index.js"]