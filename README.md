# A Svelte Demo Web App with Golang Backend Service and SQLite

This is a simple shopping demo app, inspired by the same Angular/React/Vue.js examples in <i>[Essential Typescript](https://github.com/Apress/essential-typescript-4)</i> by Adam Freeman:

- The frontend is built with [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/) with [TypeScript](https://www.typescriptlang.org/). `@sveltejs/adapter-static` is used to generate a static JavaScript production.
- The backend is built with [Golang](https://go.dev/): a web server/REST APIs using [gin](https://github.com/gin-gonic/gin) and [go-sqlite3](https://github.com/mattn/go-sqlite3) for the SQlite3 database.
- A Dockerfile that creates a container with multi-stage builds (image size ~25 MB).

Right now, like all the original examples, the app only reads product lists and write order data. You can use [DB Browser for SQLite](https://sqlitebrowser.org/) to read the database.

![ezgif-5-22d3d39425](https://user-images.githubusercontent.com/44191076/148008744-14f89c9d-5343-483a-8bdc-c05618a84acc.gif)

A similar project using Vue.js, MongoDB and Docker Compose [can be found here](https://github.com/alankrantas/vueapp-typescript-express).

## Project Local Setup

For local environment you need

- [Node.js](https://nodejs.org/en/download/)
- [Golang](https://go.dev/dl/)
- [Git](https://git-scm.com/download/win).
- If you are using Windows the Go-ang binary needs gcc to compile, which can be installed with [Mingw-w64](https://www.mingw-w64.org/)

Download the project:

```bash
git clone https://github.com/alankrantas/svelteapp-typescript-go.git
```

## Dev Mode (backend not required)

Run the Svelte app in dev mode:

```bash
npm run setup
npm run dev
```

The app will not call any backend APIs; instead it returns built-in mock product data and the returned order number is always 1.

## Build and Run Production

### `npm run setup-all`

Install Svelte and Golang app dependencies. Equivalent to

```bash
npm i
npm prune
go get -u ./...
```

> You can run `npm run setup` to install Svelte app's dependencies only.

### `npm run upgrade-all`

Upgrade all Svelte/Go dependencies. Equivalent to

```
npx npm-check-updates -u
npm run setup-all
```

> You can run `npm run upgrade` to upgrade the Svelte app packages only.

### `npm run build-all`

Build the Svelte production and Golang executable binary. Equivalent to

```bash
npx vite build
go build .
```

> You can run `npm run build` to build the Svelte app only.

### `npm run serve`

Start a server at `http://localhost:8080`. Equivalent to

```bash
./main
```

Then open `http://localhost:8080`.

You can change the host and port as

```bash
./main -host 127.0.0.1 -port 8080
```

## Build and Run as Docker Container

### `npm run docker`

Generate a Docker image then run it. Do not require to install Node.js or Golang. Equivalent to

```bash
docker build . -t svelte-ts-go -f Dockerfile
docker run -p 8080:8080 --rm svelte-ts-go
```

Then open `http://localhost:8080`.

## (Git Commands Notes for Self)

```bash
git clone https://github.com/alankrantas/svelteapp-typescript-go.git
git pull origin master
git add .
git commit -m "Updating"
git remote add origin https://github.com/alankrantas/svelteapp-typescript-go.git
git push origin master
```

After that, simply run `npm run commit` to commit changes.
