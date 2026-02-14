const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

const io = new Server(server);

io.on('connection', (socket) => {

    console.log('Socket ID: ', socket.id);
    // console.log('Socket Handshake: ', socket.handshake);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})

