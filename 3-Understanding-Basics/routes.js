const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write('<html>');
        res.write('<head><title>Enter a message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/> <button type="submit">Send</button></form></body>');
        res.write('</html>')
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const buffer = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            buffer.push(chunk);
        });
        return req.on('end', () => {
            const parseBuffer = Buffer.concat(buffer).toString('utf8');
            console.log(parseBuffer);

            fs.writeFile('message.txt', parseBuffer, (err) => {
                console.log('Done');
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Hello Nodejs server</title></head>');
    res.write('<body><h1>First Nodejs server</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = {
    requestHandler: requestHandler
};

//module.exports = requestHandler;