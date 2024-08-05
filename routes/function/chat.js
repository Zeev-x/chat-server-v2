const socketIo = require('socket.io');
const fs = require('fs');

let riwayatChat = [
    'Server : Chat server ini di buat oleh Reyette dengan nodejs dan react native',
    'Reyette : Selamat datang User 😊'
];

function setupSocketServer(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        socket.emit('messageHistory', riwayatChat);

        socket.on('message', (message) => {
            riwayatChat.push(message);
            io.emit('message', message);
        });

        socket.on('disconnect', () => {});
    });

    return io;
}

module.exports = setupSocketServer;
