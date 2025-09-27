FROM node:24-alpine AS base

# Set working directory in container
WORKDIR /usr/local/app

FROM base AS client-base
# Copy package files
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/prettier.config.ts client/eslint.config.ts client/vite.config.ts ./
COPY client/eslint.config.ts client/postcss.config.js ./
COPY client/tsconfig.json client/tailwind.config.js ./
#COPY client/.react-router ./.react-router
COPY client/react-router.config.ts ./
COPY client/public ./public
COPY client/app ./app


###################################################
# Stage: client-dev
#
# This stage is used for development of the client application. It sets
# the default command to start the Vite development server.
###################################################
FROM client-base AS client-dev
CMD ["npm", "run", "dev"]


FROM node:24-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:24-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /client/app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:24-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /client/app/node_modules /app/node_modules
COPY --from=build-env /client/app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]
