FROM node:16-slim AS dependency


RUN apt update -yq && apt install -yq --no-install-recommends openssl && apt clean && rm -rf /var/lib/apt/lists/*

FROM dependency AS build

WORKDIR /app
COPY . .

RUN yarn install --non-interactive --frozen-lockfile && yarn cache clean
RUN yarn build

FROM dependency AS app

WORKDIR /app

RUN chown -R node:node /app

COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/node_modules /app/node_modules

USER node
ENV NODE_ENV=production
EXPOSE 4000

ENTRYPOINT ["node", "/app/dist/main"]