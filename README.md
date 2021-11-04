# Yumemi Frontend Task

This app is SPA(Single Page Application) that displays a graph of total population change by prefecture.

## How to work

### Install dependencies

```
yarn install
```

### Start

```
yarn start
```

### Build

```
yarn build
```

## Proxy-Backend

To resolve the problem to expose RESAS_API_KEY, I implement Proxy-Backend service in Golang. Proxy-Backend provides Resas API data by proxy. Proxy-Backend is deployed on Google Cloud Run.

## Tools

### Language

- TypeScript

### Frontend Framework

- React

### Build & Bundle

- snowpack

### Linter & Formatter

- eslint: Linter
- prettier: Formatter
- husky: Hook git commit
- lint-staged: Run linter against staged git files

### CSS in JS

- @emotion/css: Detach CSS from JSX

### Chart Library

- highcharts
