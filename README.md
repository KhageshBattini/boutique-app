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
