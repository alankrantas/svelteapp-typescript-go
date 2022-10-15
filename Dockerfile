#
# svelte-builder
#

FROM node:alpine as app-builder

WORKDIR /app
COPY . /app

RUN npm install
RUN npx vite build

#
# server-builder (CGO is required)
#

FROM golang:alpine as server-builder

RUN apk add build-base

WORKDIR /app

COPY backend /app/backend
COPY go.* /app
COPY *.go /app

RUN go build -mod=readonly -v

#
# deploy
#

FROM alpine as deploy

WORKDIR /app

COPY --from=app-builder /app/build /app/build
COPY --from=server-builder /app /app

EXPOSE 8080

CMD ./main -docker
