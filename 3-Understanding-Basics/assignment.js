
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body>');
        res.write('<form method="POST" action="/create-user">');
        res.write('<h1>Add an user name</h1>');
        res.write('</p>');
        res.write('<input type="text" name="userName"/>');
        res.write('<button type="submit" >Add</button></form></body>');
        res.write('</html>');
        
        return res.end();
    }
    if (url === 'users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body><h1>Users list</h1><ul><li>Raquel</li><li>Rafael</li><li>Antonina</li></ul></body>')
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const chunks = [];
        req.on('data', c => {
            chunks.push(c);
        });
        return req.on('end', () => {
            const parseBuffer = Buffer.concat(chunks).toString();
            const userName = parseBuffer.split('=')[1];
            console.log(`User name: ${userName}`);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }    
};

module.exports = {
    requestHandler: requestHandler
};