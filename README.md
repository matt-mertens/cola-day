<p align="center">
  <a href="https://matthewmertens.com" target="blank">
    <img style="background: linear-gradient(87deg,#f5365c 0,#f56036 100%)!important; border-radius: 50%; height: 60px" src="https://matthewmertens.com/static/media/cola-logo-light.b123344a.png" alt="ColaDay Logo" />
  </a>
</p>

# Cola Day

[ColaDay](https://matthewmertens.com)   
[ColaDay Api Base Url](https://api.matthewmertens.com/api/)   
[ColaDay Api Docs](https://api.matthewmertens.com/api/)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Features

- Users can see meeting rooms availability
- Users can book meeting rooms by the hour (first come first served)
- Users can cancel their own reservations

## Project Structure

```bash
├── src
│   ├── auth (Authorization Module)
│   ├── config (Configuration)
│   ├── reservations (Reservation Module)
│   ├── rooms (Room Module)
│   ├── app.module.ts
│   └── main.ts
├── dist (or build)
├── node_modules
├── public
├── test
├── .env.development
├── .env.production
├── Dockerfile (Dockerfile for containeried builds)
├── nestcli.json
├── tsconfig.json 
├── README.md
├── package.json
└── .gitignore
```