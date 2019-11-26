var net = require('net');
const express = require('express');
var path = require("path");
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var HOST = '103.137.185.94';
var PORT = 9000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});


app.listen(3000);
net.createServer(function(sock) {
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  sock.on('data', function(data) {
    console.log('DATA :' + data);
   
  });
 
  sock.on('send', function (data) {
    io.sockets.emit('send', data);
        });

 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);

 });
  
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
// io.on('connection', function (socket) {
//     console.log('Welcome to server chat');
//     socket.on('send', function (data) {
//         io.sockets.emit('send', data);
//     });
// });

