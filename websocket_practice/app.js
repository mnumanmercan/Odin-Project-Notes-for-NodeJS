const express = require('express');
const http = require('http');
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {

    console.log('Someone connected ;)')
});

server.listen(3000, () => {
    console.log(`Server started at: localhost:3000`)
})

