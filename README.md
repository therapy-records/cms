# Therapy Records CMS

A small CMS to manage artist albums, news, bookings, releases and more.

Boilerplate from [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)

## Requirements
* node `^4.5.0`
* yarn `^0.17.0` or npm `^3.0.0`

## Getting Started

```bash
$ git clone https://github.com/therapy-records/cms.git && cd cms
```

```bash
$ yarn install && yarn start
```

## Scripts

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Application Structure

```
.
├── bin                      # Build/Start scripts
├── config                   # Project and build configurations
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout.js    # CoreLayout which receives children for each route
│   │   └── CoreLayout.scss  # Styles related to the CoreLayout
│   │   └── index.js         # Main file for layout
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes **    # Fractal sub-routes (** optional)
│   │   └── Counter          # Fractal route
│   │       ├── index.js     # Counter route definition
│   │       ├── container    # Connect components to actions and store
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```
