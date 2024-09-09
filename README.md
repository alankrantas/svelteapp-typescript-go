# A Full-Stack, Self-Contained Shopping Demo App With Svelte, Golang and SQLite

![ezgif-5-22d3d39425](https://user-images.githubusercontent.com/44191076/148008744-14f89c9d-5343-483a-8bdc-c05618a84acc.gif)

This is a simple shopping demo app, based on the same Angular/React/Vue.js examples in <i>[Essential Typescript](https://github.com/Apress/essential-typescript-4)</i> by Adam Freeman:

- Front-end: (`/src`)
  - [TypeScript](https://www.typescriptlang.org/)
  - Component framework: [Svelte 4](https://svelte.dev/)
  - Application framework: [SvelteKit 2](https://kit.svelte.dev/)
  - Static site generation: [@sveltejs/adapter-static](https://www.npmjs.com/package/@sveltejs/adapter-static)
  - CSS styles: [Bootstrap](https://getbootstrap.com/)
- Back-end: (`/backend`)
  - [Golang](https://go.dev/)
  - Static web server/RESTful web services: [gin](https://github.com/gin-gonic/gin)
  - SQLite driver: [go-sqlite3](https://github.com/mattn/go-sqlite3)
- Database: (`/db`)
  - [SQLite](https://www.sqlite.org/index.html)

The project comes with a [Dockerfile](https://github.com/alankrantas/svelteapp-typescript-go/blob/main/Dockerfile) that can create a single small container with multi-stage builds (image size less than 25 MB) and also support to be opened in [DevContainer](https://code.visualstudio.com/docs/devcontainers/containers)/[CodeSpace](https://github.com/features/codespaces).

The purpose of project is a demonstration to build a small and self-contained full-stack monolithic application with modern frameworks, but it is not meant to be a practical template for any real world applications. For example, error handlings are mostly ignored and there is no any form of authentication.

> A similar version using Vue.js, Express, MongoDB and Docker Compose [can be found here](https://github.com/alankrantas/vueapp-typescript-express) (no longer maintained).

## Routes

The Svelte app has the following routes:

| Route           | Page                                     |
| --------------- | ---------------------------------------- |
| `/`             | Index (redirect to `/products`)          |
| `/products`     | Browse and add products to shopping cart |
| `/order`        | View and checkout order                  |
| `/summary/{id}` | Order result                             |

## Backend APIs

The backend creates two RESTful-like APIs:

| API                 | Function                                 |
| ------------------- | ---------------------------------------- |
| GET `/api/products` | Query and return product data            |
| POST `/api/orders`  | Write order data and return new order ID |

Adam Freeman's original projects use [`json-server`](https://github.com/typicode/json-server) on an Express server as mock API services. I keep the input/output spec of the services for the sake of demonstration. Right now, like all the original examples, the app only reads product lists and write order data. The `Axios` package used in the original examples is also replaced with `fetch`.

> SvelteKit also has a feature to create ["backend APIs"](https://kit.svelte.dev/docs/routing#server). However the Golang server here is enough, so we don't really need to create duplicated APIs.

### `/api/products`

Return a list of products from the database. The `category` will be used to create category filter buttons on the app.

Example request body:

(none)

Example response body:

```json
[
	{
		"id": 1,
		"name": "Kayak",
		"category": "Watersports",
		"description": "A boat for one person",
		"price": 275.0
	},
	{
		"id": 2,
		"name": "Lifejacket",
		"category": "Watersports",
		"description": "Protective and fashionable",
		"price": 48.95
	}
]
```

### `/api/orders`

Write ordered item and quantities. The service will create a new order ID and associate it with the ordered products.

Example request body:

```json
{
	"lines": [
		{
			"productId": 1,
			"productName": "Kayak",
			"quantity": 2
		},
		{
			"productId": 2,
			"productName": "Lifejacket",
			"quantity": 4
		}
	]
}
```

Example response body:

```json
{
	"id": 42
}
```

---

## Database Schemes and Example Data

The SQLite database (`./db/data.sqlite3`) in this repo already contains the table `products` with 9 product records (which can be found in many Adam Freeman's books) and an empty table `orders`. You can use [DB Browser for SQLite](https://sqlitebrowser.org/) to read the database. There is also a backup file in case you need to restore the database.

Here's the SQL statements to recreate them:

```sql
CREATE TABLE "products" (
    "id"    INTEGER NOT NULL UNIQUE, -- product ID
    "name"    TEXT NOT NULL,
    "category"    TEXT NOT NULL,
    "description"    TEXT,
    "price"    REAL NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "orders" (
    "id"    INTEGER NOT NULL, -- order ID
    "product_id"    INTEGER NOT NULL, -- product ID
    "quantity"    INTEGER NOT NULL
);

INSERT INTO "main"."products" (
    "id",
    "name",
    "category",
    "description",
    "price"
)
VALUES
    ('1', 'Kayak', 'Watersports', 'A boat for one person', '275.0'),
    ('2', 'Lifejacket', 'Watersports', 'Protective and fashionable', '48.95'),
    ('3', 'Soccer Ball', 'Soccer', 'FIFA-approved size and weight', '19.5'),
    ('4', 'Corner Flags', 'Soccer', 'Give your playing field a professional touch', '34.95'),
    ('5', 'Stadium', 'Soccer', 'Flat-packed 35,000-seat stadium', '79500.0'),
    ('6', 'Thinking Cap', 'Chess', 'Improve brain efficiency by 75%', '16.0'),
    ('7', 'Unsteady Chair', 'Chess', 'Secretly give your opponent a disadvantage', '29.95'),
    ('8', 'Human Chess Board', 'Chess', 'A fun game for the family', '75.0'),
    ('9', 'Bling Bling King', 'Chess', 'Gold-plated, diamond-studded King', '1200.0');
```

---

## Setup Local Project

For local development you'll need

- [Git](https://git-scm.com/download/)
- [Node.js](https://nodejs.org/en/download/) (for dev or production)
- [Golang](https://go.dev/dl/) (for production)
- [Docker](https://docs.docker.com/get-docker/) (only required for generating the container)

> Note: the `go-sqlite3` package requires GCC to compile with the environment variable `CGO_ENABLED=1`.
>
> For Windows users, it can be installed with [MinGW](https://winlibs.com/#download-release) (unzip and add `\mingw64\bin` to `$PATH`, then restart VS Code). On Linux it can be installed with the package `build-essential`.

### Clone Repository

```bash
git clone https://github.com/alankrantas/svelteapp-typescript-go.git
cd svelteapp-typescript-go
npm i -g yarn@latest
yarn setup-full
```

And install/upgrade yarn:

```bash
npm i -g yarn@latest
```

### Serve Frontend in Dev Mode

Run the Svelte app in development mode. The app _will not_ call any backend APIs, instead it returns mock product data and the returned order number is always `42`.

```bash
yarn dev
```

The app will be open at `http://localhost:3000`.

### Download Dependencies

```bash
# download frontend dependencies
yarn

# download backend dependencies
yarn setup-server

# download both dependencies
yarn setup-full
# or
# yarn setup-all
```

### Upgrade Dependencies

```bash
# upgrade frontend dependencies
yarn upgrade-app

# upgrade backend dependencies
yarn upgrade-server

# upgrade both dependencies
yarn upgrade-full
# or
# yarn upgrade-all
```

### Build Production

Install dependencies, build both front-end and back-end apps and run the local server:

```bash
# build frontend app
yarn build-app

# build backend server (which will set CGO_ENABLED=1)
yarn build-server

# build both
yarn build-full
# or
# yarn build
# yarn build-all
```

### Serve Production

```bash
# serve in macOS or Linux
yarn serve

# serve in Windows
yarn serve-win
```

The app would open at `http://localhost:8080`.

---

### Build and Run as a Docker Container

```bash
# build container
yarn docker

# run container
yarn docker-run
```

The app would open at `http://localhost:8080`.
