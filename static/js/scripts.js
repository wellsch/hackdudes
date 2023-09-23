// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const socket = io('http://127.0.0.1:5000/');

    socket.emit('chat message', 'Hello, server!');

    // Listen for an event from the server
    socket.on('chat message', (message) => {
        console.log('Received message from server:', message);
    });
});
