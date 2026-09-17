FROM node:24.4.1-alpine3.21

WORKDIR /app

RUN npm install -g pnpm@10.28.2

COPY package.json pnpm-lock.yaml ./

RUN pnpm config set minimumReleaseAge 0 && pnpm i --frozen-lockfile --ignore-scripts

COPY . .