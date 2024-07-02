#
# svelte-builder
#

FROM node:alpine as app-builder

WORKDIR /app
COPY . /app

RUN yarn install --frozen-lockfile
RUN yarn check
RUN yarn vite build

#
# server-builder (CGO is required)
#

FROM golang:alpine as server-builder

ENV CGO_ENABLED=1
RUN apk add build-base

WORKDIR /app

COPY backend /app/backend
COPY go.* /app
COPY *.go /app

RUN go build -buildvcs=false -mod=readonly -v

#
# deploy
#

FROM alpine as deployment

WORKDIR /app

COPY db /app/db
COPY --from=app-builder /app/build /app/build
COPY --from=server-builder /app/main /app

EXPOSE 8080

CMD ./main -docker
