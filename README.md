# A Svelte Demo Web App with Golang Backend Service and SQLite

This is a simple shopping demo app, inspired by the same Angular/React/Vue.js examples in <i>[Essential Typescript](https://github.com/Apress/essential-typescript-4)</i> by Adam Freeman.

- The frontend is built with [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/) with [TypeScript](https://www.typescriptlang.org/) typing. I use `@sveltejs/adapter-static` to generate a static JavaScript production.
- The backend is built with [Golang](https://go.dev/): a server/REST APIs using [gin](https://github.com/gin-gonic/gin) and [go-sqlite3](https://github.com/mattn/go-sqlite3) for the SQlite3 database.
- A Dockerfile tha uses multi-stage builds (image size ~24 MB). The Dockerfile will update everything to the latest version.

Right now, like all the original examples, the app only reads product lists and write order data.

![ezgif-5-22d3d39425](https://user-images.githubusercontent.com/44191076/148008744-14f89c9d-5343-483a-8bdc-c05618a84acc.gif)

## Project Local Setup

For local environment, you need

* [Node.js](https://nodejs.org/en/download/)
* [Golang](https://go.dev/dl/)
* [Git](https://git-scm.com/download/win).

### ```npm run setup```

Install Svelte and Golang app dependencies.

```bash
npm install
npm prune
go get ./...
go mod tidy
```

### ```npm run build```

Build Svelte production and Golang executable binary.

```bash
vite build
go build .
```

### ```npm run serve```

Start a server at ```http://localhost:8080```.

```bash
./main
```

You can change the host and port as

```bash
./main -host 127.0.0.1 -port 8080
```

### ```npm start```

Run all the scripts above.

## Generate and Run in Docker

### ```npm run docker```

Generate a Docker image then run it.

```bash
docker build . -t svelte-ts-go -f Dockerfile
docker run -p 8080:8080 --rm svelte-ts-go
```

## (Git Commands Notes for Self)

```bash
git clone https://github.com/alankrantas/svelteapp-typescript-go.git
git init
git add .
git commit -m "Updating"
git remote add origin https://github.com/alankrantas/svelteapp-typescript-go.git
git pull origin master --allow-unrelated-histories
git push origin master
```

After that, simply run ```npm run commit``` to commit changes.