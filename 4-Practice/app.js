import http from 'node:http'
import fs from 'node:fs';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = http.createServer((req, res) => {
    let fileName = req.url === '/' ? 'index.html' : `${req.url}.html`

    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, (err, data) => {
        if(err) {
            const errorPath = path.join(__dirname, '404.html');

            fs.readFile(errorPath, (err404, data404) => {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data404);
            })

            return
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    })
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}, message: ${process.env.MESSAGE}`);
});