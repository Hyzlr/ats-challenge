# ===============================================================================
# BUILDER PHASE
# ===============================================================================

FROM alpine:latest as builder

RUN set -xe

RUN apk add --no-cache \
    curl \
    bash

RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /server

COPY package.json .
COPY bun.lockb .
COPY ./src ./src
COPY tsconfig.json .
COPY tsconfig.build.json .

RUN bun install && bun build:app

RUN echo "Build completed!"

# ===============================================================================
# PRODUCTION PHASE
# ===============================================================================

FROM alpine:latest as production

RUN set -xe

RUN apk add --no-cache \
    curl \
    bash

RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /server

COPY --from=builder ./server/node_modules ./node_modules
COPY --from=builder ./server/bun.lockb .
COPY --from=builder dist .
COPY .env .
COPY pm2.config.js .

RUN bun install pm2

CMD ["pm2", "start", "pm2.config.js"]

EXPOSE 8000
