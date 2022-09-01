# A Svelte Demo Web App with Golang Backend Service and SQLite

This is a simple shopping demo app, inspired by the same Angular/React/Vue.js examples in <i>[Essential Typescript](https://github.com/Apress/essential-typescript-4)</i> by Adam Freeman.

* The frontend is built with [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/) with [TypeScript](https://www.typescriptlang.org/) typing. I use ```@sveltejs/adapter-static``` to generate a static JavaScript production.
* The backend is built with [Golang](https://go.dev/): a server/REST APIs using [gin](https://github.com/gin-gonic/gin) and [go-sqlite3](https://github.com/mattn/go-sqlite3) for the SQlite3 database.
* A Dockerfile tha uses multi-stage builds (image size ~24 MB). The Dockerfile will update everything to the latest version.

Right now, like all the original examples, the app only reads product lists and write order data.

![ezgif-5-22d3d39425](https://user-images.githubusercontent.com/44191076/148008744-14f89c9d-5343-483a-8bdc-c05618a84acc.gif)

## Project local setup

For local environment, you need [Node.js](https://nodejs.org/en/download/), [Golang](https://go.dev/dl/) and [Git](https://git-scm.com/download/win).

### Svelte

Download the project then install frontend packages from the project root dir:

```bash
npm install
npm prune
```

To upgrade Svelte to the latest version (using [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)):

```bash
npm install
```

### Golang

Then install Golang dependencies (gin framework and SQLite3 driver):

```bash
go get -u ./...
go mod tidy
```

or manually install them yourself:

```bash
go get -u github.com/gin-gonic/gin
go get -u github.com/mattn/go-sqlite3
go mod tidy
```

> Or simply run ```npm run setup```. This script would install everything and also build a Svelte production.

Note: On Windows you need to install [gcc](https://osdn.net/projects/mingw/) for ```go-sqlite3```. You can also download [DB Browser for SQLite](https://sqlitebrowser.org/dl/) to inspect the database.

## Build local production, start local server and REST service

In order to run the app, you need to build a Svelte production first:

```bash
npm run build
```

Now you can run the Go server/service:

```bash
go run .
```

Then open ```http://localhost:8080```.

> Use ```npm start``` to automatically start the server and open this URL.

You can also specify the host and port:

```bash
go run . -host 127.0.0.1 -port 8080
```

Press ```Ctrl + C``` to gracefully shutdown the server.

## Create a Docker image and run in container

Install [Docker](https://www.docker.com/products/docker-desktop). On Windows you need to enable [virtualization](https://docs.docker.com/desktop/windows/troubleshoot/#virtualization).

```bash
docker build . -t svelte-ts-go -f Dockerfile
docker run -p 8080:8080 --rm svelte-ts-go
```

And open ```http://localhost:8080```. 

Or simply run (if you have Node.js installed)

```bash
npm run docker
```

The Docker container would build a Svelte production and compile a Golang binary on its own, so in fact you don't need to install anything other than Docker to generate the container.

## (Note to Self Update)

```bash
git init
git add .
git commit -m "Updating"
git remote add origin https://github.com/alankrantas/svelteapp-typescript-go.git
git pull origin master --allow-unrelated-histories
git push origin master
```