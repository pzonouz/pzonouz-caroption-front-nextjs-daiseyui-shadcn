FROM node:22.16.0
WORKDIR /app
COPY package.json .
RUN npm set registry https://registry.npmmirror.com/
RUN npm install -g pnpm --verbose
RUN pnpm set registry https://registry.npmmirror.com/
COPY package.json /app/
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]

