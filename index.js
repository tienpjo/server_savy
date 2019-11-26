
const express = require('express');
var path = require("path");
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, function() {
    console.log('Socket IO Server is listening on port 3000');
  });

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
 
});

io.sockets.on('connection', function(socket) {
    console.log('connection...');
        socket.on('emit_from_client', function(data) {
      console.log('socket.io server received : '+data);
      io.sockets.emit('emit_from_server', data);
    });
  });

var net = require('net');
var HOST = '103.137.185.94';
var PORT = 9000;
net.createServer(function(sock) {
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  sock.on('data', function(data) {
    var line = data.toString();
  //  console.log('got "data"', line);
   // sock.pipe(writable);
    io.sockets.emit('emit_from_server', line); // socket.io呼び出し
  });
 

 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);

 });
  
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
