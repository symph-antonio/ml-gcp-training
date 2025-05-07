# Build stage
FROM node:22-alpine AS builder

# Add non-root user
RUN addgroup -S nodejs && adduser -S nodeusr -G nodejs

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine

# Add non-root user
RUN addgroup -S nodejs && adduser -S nodeusr -G nodejs

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./
COPY --from=builder /app/prisma ./

# Install only production dependencies
RUN npm ci --only=production

# Set environment variables
ENV NODE_ENV=production

# Use non-root user
USER nodeusr

# Expose the port your app runs on (adjust if needed)
EXPOSE 8080

# Start the application
CMD ["node", "main.js"]
