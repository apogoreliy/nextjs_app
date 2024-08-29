FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm i
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev", "-p", "3000"]