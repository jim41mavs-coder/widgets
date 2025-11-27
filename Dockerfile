# -----------------------------
# 1. Build Stage
# -----------------------------
FROM node:22-slim AS builder

RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get autoremove -y && \
    apt-get clean

WORKDIR /app

# Install deps first (cache layer)
COPY package*.json ./
RUN npm install

# Copy full project
COPY . .

# Build Next.js app
RUN npm run build


# -----------------------------
# 2. Run Stage
# -----------------------------
FROM node:22-slim AS runner

RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get autoremove -y && \
    apt-get clean

WORKDIR /app
ENV NODE_ENV=production

# Copy build output & necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Required for API routes + runtime context
COPY --from=builder /app/src ./src

# Required for persistence (your JSON DB)
COPY --from=builder /app/db.json ./db.json

# Copy package files (needed for prod deps)
COPY --from=builder /app/package*.json ./

# Install production-only deps
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
