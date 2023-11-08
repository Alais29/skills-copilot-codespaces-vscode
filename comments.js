// create web server
const http = require('http');
const server = http.createServer((req, res) => {
    // 2. create router
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }
    if (req.url === '/api/members') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

// 4. start server
server.listen(3000);
console.log('Listening on port 3000...');