# Glovo Interview Test

## Installation Guide

Steps:

1. Clone this project `git clone git@github.com:marduke182/glovo.git`
2. Install node version specified in file .nvmrc, **be sure that the version is the correct one with `node -v`**

   [Mac Installer](https://github.com/nodejs/node), [Windows Installer](https://github.com/nodejs/node), [Ubuntu, by packet manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

   We recommend using [nvm](https://github.com/creationix/nvm) to easily install multiple versions of node.

3. Install all dependencies

## Development

1. Copy `env.default` file into a local `.env` file at root level
2. Run: `npm start` to start a server that rebuild at any change
3. Run Server: Run glovo interview server with images and enpoints (found server folder)
4. Open the browser on: http://localhost:3031

## Server

I put the server inside of the project on folder **server**, you can run it following this steps:

1. Install all dependencies (yarn or npm install works)
2. Execute **app.js** file, `node app.js | npm run serve | yarn serve|`
