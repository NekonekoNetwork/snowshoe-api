FROM node:16-alpine AS base

WORKDIR /app

RUN chown -R node:node /app
USER node

FROM base AS depends

COPY ./package.json ./yarn.lock ./
COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN yarn install --non-interactive --frozen-lockfile && yarn cache clean

FROM depends AS build

COPY . .

RUN yarn build

FROM base AS prod_depends

COPY ./package.json ./yarn.lock ./
RUN yarn install --non-interactive --frozen-lockfile --production --ignore-scripts && yarn cache clean

FROM base as production

EXPOSE 4000 
ENV NODE_ENV=production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=prod_depends /app/node_modules /app/node_modules

CMD ["node", "/app/dist/main"]
