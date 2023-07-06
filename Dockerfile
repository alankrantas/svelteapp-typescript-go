#
# svelte-builder
#

FROM node:alpine as app-builder

WORKDIR /app
COPY . /app

RUN npm run setup
RUN npm run build

#
# server-builder (CGO is required; do not use CGO_ENABLED=0)
#

FROM golang:alpine as server-builder

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
