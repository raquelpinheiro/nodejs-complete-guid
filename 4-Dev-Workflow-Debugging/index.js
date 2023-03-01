const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>Hello</title></head><body><h1>Hello, welcome! </h1></body></html>');
    return res.end();
});

server.listen(3000);