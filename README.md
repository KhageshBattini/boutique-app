# ALANKRITA - The Art of Adornment

An elegant React-based boutique application featuring fashion and accessories.

## Tech Stack

- **React 18** - Modern React with hooks
- **Redux Toolkit** - State management
- **Material UI** - UI component library
- **React Router** - Client-side routing
- **TypeScript** - Type safety

## Features

- **Product Catalog** - Browse elegant fashion items and accessories
- **Shopping Cart** - Add items, adjust quantities, view totals
- **User Authentication** - Login system with demo mode
- **Checkout Process** - Multi-step checkout with shipping information
- **Responsive Design** - Works on mobile, tablet, and desktop

## Getting Started

## CI/CD (GitHub Actions)

This repository includes an automated workflow at `.github/workflows/ci-cd.yml`.

### What happens automatically

1. **CI (continuous integration)** runs for every pull request and every push to `master`. GitHub checks out the code, installs Node.js 20 dependencies with `npm ci`, builds the React app, installs Java 26, and runs Maven's `verify` goal for the API. A failure marks the workflow red, so you can fix it before merging.
2. **CD (continuous delivery)** runs only after CI succeeds on a push to `master`. It builds Docker images for the API and website, then publishes them to GitHub Container Registry (GHCR). Each image gets a `latest` tag and a tag containing the exact commit SHA, so you can choose a recent build or pin a specific build.

### One-time GitHub setup

The workflow needs to know the public URL of your deployed API so the website can call it. In GitHub, open **Settings → Secrets and variables → Actions → Variables → New repository variable** and create:

- Name: `API_BASE_URL`
- Value: `https://your-api-domain.example/api` (replace this with your actual API URL; keep `/api` at the end)

This is a **variable**, not a secret: the frontend URL is included in browser JavaScript and is visible to visitors. Do not put passwords or private keys in it. The publish job uses GitHub's temporary `GITHUB_TOKEN` to upload packages; you do not need to create a personal access token. In repository **Settings → Actions → General → Workflow permissions**, allow workflows to read and write packages if publishing is denied.

### What gets published and what remains

For this repository, the images are:

- `ghcr.io/khageshbattini/boutique-app-api:latest`
- `ghcr.io/khageshbattini/boutique-app-web:latest`

The SHA-tagged versions appear alongside them in **Packages** on GitHub. GHCR publication is continuous delivery: it creates deployable images, but it does not log into a hosting server or make the site live by itself. You still need a server/container host, a MySQL database, and a deployment step for that host. Set `APP_CORS_ALLOWED_ORIGIN` on the API to the website's origin (for example `https://shop.example.com`, without `/api`) so browsers are allowed to call it. For local development it defaults to `http://localhost:3000`.

### Beginner glossary

- **Workflow**: the YAML recipe GitHub follows, stored under `.github/workflows/`.
- **Runner**: a temporary computer GitHub starts to perform the recipe.
- **CI**: automatically checking that source code still installs and builds.
- **CD**: automatically packaging successful code and delivering that package to a registry. A separate host deployment can be added once you choose where to run the app.
- **Docker image**: a packaged application with its runtime, ready for a container host to start.
- **GHCR**: GitHub's registry for storing and distributing Docker images.
- **Pull request**: a proposed change. CI checks it before you merge it; publishing waits until the change reaches `master`.

The first run starts when you push this workflow to GitHub. Open the repository's **Actions** tab to see each step and its logs. A failed step is shown in red; expand it to read the error.

## Backend and MySQL setup

The frontend now uses a Java (Spring Boot) REST API in `backend/`. MySQL stores users, products, signed-in sessions, orders, and order items. The SQL migrations are in `backend/src/main/resources/db/migration`; Flyway runs them in order and records which ones have already run.

1. Install Java 17 or newer, Maven, and either Docker Desktop or MySQL 8.
2. In `backend/`, copy `.env.example` to `.env`, replace both example passwords, then run `docker compose up -d` to start MySQL. If you use an existing MySQL server, create the `alankrita` database and set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` instead.
3. Start the API: `mvn spring-boot:run` from `backend/`. It listens on `http://localhost:8080` and applies the database migrations automatically.
4. In a second terminal, run `npm start` from this project folder. Open `http://localhost:3000` and create an account.

The browser keeps a temporary sign-in token in local storage. The API checks it for profile updates and orders; its database session expires after seven days. Product prices are recalculated by the server during checkout, so a browser cannot submit a different price.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
