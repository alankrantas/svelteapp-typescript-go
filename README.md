# A Svelte Demo Web App with Golang Backend Service and SQLite

This is a simple shopping demo app, inspired by the same Angular/React/Vue.js examples in <i>[Essential Typescript](https://github.com/Apress/essential-typescript-4)</i> by Adam Freeman:

- The frontend is built with [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/) using [TypeScript](https://www.typescriptlang.org/). `@sveltejs/adapter-static` is used to generate a static JavaScript production.
- The backend is built with [Golang](https://go.dev/): a web server/REST APIs using [gin](https://github.com/gin-gonic/gin) and [go-sqlite3](https://github.com/mattn/go-sqlite3) for the SQLite database. In theory you can swap the DB driver to the ones you like.
- A Dockerfile that creates a single container with multi-stage builds (image size ~25 MB).

Adam Freeman's original projects use `json-server` on an Express server as mock API services. I did not change the spec of the services for the sake of demonstration. Right now, like all the original examples, the app only reads product lists and write order data. You can use [DB Browser for SQLite](https://sqlitebrowser.org/) to read the database.

The purpose of project is to show how to build a small, modern full-stack monolithic application, but it is not meant to be a practical template for any real world applications.

![ezgif-5-22d3d39425](https://user-images.githubusercontent.com/44191076/148008744-14f89c9d-5343-483a-8bdc-c05618a84acc.gif)

A similar version using Vue.js, Express, MongoDB and Docker Compose [can be found here](https://github.com/alankrantas/vueapp-typescript-express).

## Setup Local Project

For local development you'll need

- [Git](https://git-scm.com/download/)
- [Node.js](https://nodejs.org/en/download/)
- [Golang](https://go.dev/dl/) (not required in dev mode)
- [Docker](https://docs.docker.com/get-docker/) (only required for generating the container)

> If you are using Windows the `go-sqlite3` package needs GCC to compile, which can be installed with [MinGW](https://sourceforge.net/projects/mingw/) (choose `MinGW32-base`, `MinGW32-gcc-g++` and `MinGW32-gcc-objc` package, then add `\MinGW\bin` to `$PATH`). On Linux you can get it by installing package `build-essential`.

Prepare the project:

```bash
git clone https://github.com/alankrantas/svelteapp-typescript-go.git
cd svelteapp-typescript-go
npm run setup
```

## Run in Dev Mode (no backend required)

### `npm run dev`

Run the Svelte app in dev mode: the app will not call any backend APIs, instead it returns built-in mock product data and the returned order number is always 1.

## Build and Run Production

### `npm run setup-all`

Install Svelte and Golang app dependencies. Equivalent to

```bash
npm i
npm prune
go get ./...
```

> You can run `npm run setup` to install Svelte app's dependencies only.

### `npm run upgrade-all`

Upgrade all Svelte/Go dependencies. Equivalent to

```
npx npm-check-updates -u
npm i
npm prune
go get -u ./...
```

> You can run `npm run upgrade` to upgrade the Svelte app packages only.

### `npm run build-all`

Build the Svelte production and Golang executable binary. Equivalent to

```bash
npx vite build
go build .
```

> You can run `npm run build` to build the Svelte app only.

### `npm run serve` or `npm run serve-win`

> `npm run serve-win` is for Windows users since NPM would use CMD to run bash scripts.

Start a server at `http://localhost:8080`. Equivalent to

```bash
./main
```

Then open `http://localhost:8080`. You can also use custom address and port like

```bash
./main -host 127.0.0.1 -port 8080
```

The `data.sqlite3` database under `./backend` already contains product data, the same ones as in Adam Freeman's projects.

## Build and Run as Docker Container

### `npm run docker` and `npm run docker-run`

> Does not require to install local packages or build productions first

Generate a Docker image then run it. Equivalent to

```bash
docker build . -t svelte-ts-go -f Dockerfile
docker run -p 8080:8080 --rm svelte-ts-go
```

Then open `http://localhost:8080`.

## Open in DevContainer or Github CodeSpace

A `.devcontainer/devcontainer.json` is added for enabling the app to run in [DevContainer](https://code.visualstudio.com/docs/devcontainers/containers) or [CodeSpace](https://docs.github.com/en/codespaces).
