# Todo app

A website created by [Axel Elmarsson](https://github.com/elmaxe) and Sara Videfors with React, Node.js, sqlite3 and redis as a project in the course DD1389 Internetprogrammering.

# Installation
## Prerequisites
1. Install `Node.js` by running `sudo apt-get install nodejs`
2. Install `sqlite3` by running `sudo apt-get install sqlite3`
3. Install `redis` by running `sudo apt-get install redis-server`
   1. Check that `redis` is running: `sudo service redis-server status`
   2. If not, run: `redis-server`

## Development
1. Clone this repo
2. Run `npm install` in both `client/todoapp/` and `server/`
3. Run `npm start` in both `client/todoapp/` and `server/`

Frontend is at `localhost:3000`.<br>
Backend is at `localhost:4000`.

## Deploying
1. Clone this repo
2. Run `npm run build` in `client/todoapp/`
3. TODO: Add instructions for building the server

# Links
* [Server API](/server/api.md)