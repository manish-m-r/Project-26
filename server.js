const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring')

const options = {
    hostname: 'localhost',
    port: '3000',
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'text/html'
    }
}

const list = [];
const requestListener = http.createServer(function (req, res) {
    let body = [];



    req.on('error', (err) => {
        res.writeHead(404);
        res.write('Contents you are looking are Not Found');
        res.end();
    })

        .on('data', (chunk) => {
            body.push(chunk);
        })

        .on('end', () => {
            body = Buffer.concat(body).toString();
            if (body.length) {
                list.push(body)
                console.log(list)
            }
        });

    if (req.url === '/' && req.method === 'GET') {

        fs.readFile("admin.html", function (error, pgRes) {



            if (error) {
                res.writeHead(404);
                res.write('Contents you are looking are Not Found');
                res.end();
            } else {
                res.writeHead(200, { 'Set-Cookie': 'name=manish' });
                res.write(pgRes);
                res.end();
            }
        });

    }

    if (req.url === '/' && req.method === 'POST') {

        fs.readFile("admin.html", function (error, pgRes) {


            if (error) {
                res.writeHead(404);
                res.write('Contents you are looking are Not Found');
                res.end();
            } else {
                res.writeHead(200, { 'Set-Cookie': 'name=manish' });
                res.write(` <p><b> Page still under development!!!</b> </p>

                <a href="/">You are being redirected back to the homepage...</a> `)
                res.end();
            }
        });

    }



});

requestListener.listen(options.port)



