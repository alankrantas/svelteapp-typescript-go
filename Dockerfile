#
# svelte-builder
#

FROM node:alpine as svelte-builder

RUN mkdir -p /usr/src/svelteapp
WORKDIR /usr/src/svelteapp

COPY src /usr/src/svelteapp/src
COPY static /usr/src/svelteapp/static
COPY *.js /usr/src/svelteapp/
COPY *.cjs /usr/src/svelteapp/
COPY *.json /usr/src/svelteapp/

RUN npm install -g npm-check-updates
RUN npx npm-check-updates -u
RUN npm install
RUN npm run build

#
# go-builder
#

FROM golang:alpine as go-builder

RUN apk add build-base
RUN mkdir -p /usr/src/goapp
WORKDIR /usr/src/goapp

COPY backend /usr/src/goapp/backend
COPY go.* /usr/src/goapp
COPY *.go /usr/src/goapp

RUN go build .

#
# deploy
#

FROM alpine as deploy

RUN mkdir -p /usr/src/svelte-go-app
RUN mkdir -p /usr/src/svelte-go-app/backend
RUN mkdir -p /usr/src/svelte-go-app/build
WORKDIR /usr/src/svelte-go-app

COPY --from=svelte-builder /usr/src/svelteapp/build /usr/src/svelte-go-app/build
COPY --from=go-builder /usr/src/goapp/main /usr/src/svelte-go-app
COPY --from=go-builder /usr/src/goapp/backend/data.sqlite3 /usr/src/svelte-go-app/backend

EXPOSE 8080

CMD ./main -docker
