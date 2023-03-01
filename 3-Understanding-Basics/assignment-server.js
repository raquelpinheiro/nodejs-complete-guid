const http = require('http');
const routes = require('./assignment');

const server = http.createServer(routes.requestHandler);

server.listen(3000);