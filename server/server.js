const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 9000;

const server = http.createServer((req, res) => {

    const mimeType = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };


    const parsedUrl = url.parse(req.url);

    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

    let pathname = path.join(__dirname, sanitizePath);

    console.log('request', {sanitizePath, pathname})


    fs.exists(pathname, exist => {

        if(!exist) {
            res.statusCode = 404;
            res.setHeader('Content-type', 'text/html')
            res.end(`<h1 class="Header">File ${pathname} not found!</h1><a href="/">go back</a>`);
            return;
        }

        if (fs.statSync(pathname).isDirectory()) {
            pathname += 'index.html';
        }

        fs.readFile(pathname, function(err, data){
            if(err){
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {
                const ext = path.parse(pathname).ext;
                console.log('gotcha', ext);
                res.setHeader('Content-disposition', 'attachment; filename='+ 'catt');
                res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
                res.end(data);
            }
        });

    })
});

server.on('error', err => {
    if (err.code === 'EACCES') {
        console.log(`No access to port: ${PORT}`);
    }
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});
