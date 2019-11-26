
const express = require('express')
, http = require('http');
var path = require("path");
const app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(function(req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://103.137.185.94:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
  });
  
  server.listen(3000);//, function () {
//    // var addr = app.address();
//     console.log('   app listening on http://' + addr.address + ':' + addr.port);
//   });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

// io.sockets.on('connection', function(socket) {
//     console.log('connection...');
//         socket.on('emit_from_client', function(data) {
//       console.log('socket.io server received : '+data);
//       io.sockets.emit('emit_from_server', data);
//     });
//   });

var net = require('net');
var HOST = '103.137.185.94';
var PORT = 9000;
net.createServer(function(sock) {
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
 io.sockets.on('connection', function(socket) {
    io.sockets.emit('emit_from_server', 'connected');
    sock.on('data', function(data) {
    var line = data.toString();
        socket.on('emit_from_client', function(line) {
      console.log('socket.io server received : '+line);
      io.sockets.emit('emit_from_server', line);
    });
  });
});

 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);

 });
  
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
