const http = require('http');

const url = require('url');

const projects = require('./data-store');

const requestListener = function (req, res) {

    req.on('error', err => {
        console.error(err);
        // Handle error...
        res.statusCode = 400;
        res.end('400: Bad Request');
        return;
    });

    // Parse the query params
    const queryObject = url.parse(req.url, true).query;
    // Id
    const { id } = queryObject;
    // GET METHOD
    if (req.method === 'GET') {
        // If is projects
        if (url.parse(req.url, true).pathname === '/projects/') {

            console.log(projects);

            const listFilter = projects.filter(project => project.id === parseInt(id));

            if (listFilter.length === 0) {
                res.writeHead(404);
                res.end('NOT FOUND');

            } else {
                res.writeHead(200);
                res.end(JSON.stringify(listFilter));
            }
        } else {
        }
    } else {
        res.writeHead(400);
        res.end('BAD REQUEST');
    }

}

let server = http.createServer(requestListener);
server.listen(8000);

module.exports = server;
