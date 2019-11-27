var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var net = require('net');
var cors = require('cors');
var HOST = '103.137.185.94';
var PORT = 9000;

app.options('*', cors());
app.use(cors());
server.listen(3000);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


app.use(function(req, res, next) {
        // Website you wish to allow to connect
        res.header('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
  });

net.createServer(function(sock) {
  // We have a connection - a socket object is assigned to the connection automatically
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  // Add a 'data' event handler to this instance of socket
  sock.on('data', function(data) {
    console.log('DATA ' + sock.remoteAddress + ': ' + data);
  });
  // Add a 'close' event handler to this instance of socket
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });
}).listen(PORT, HOST);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// app.use(function(req, res, next) {
//         // Website you wish to allow to connect
//         res.setHeader('Access-Control-Allow-Origin', 'http://103.137.185.94:3000');

//         // Request methods you wish to allow
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
//         // Request headers you wish to allow
//         res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
//         // Set to true if you need the website to include cookies in the requests sent
//         // to the API (e.g. in case you use sessions)
//         res.setHeader('Access-Control-Allow-Credentials', true);
    
//         // Pass to next layer of middleware
//         next();
//   });
  
  // var netServer = net.createServer(function(c) {
  //   console.log('client connected');
  
  //   c.on('end', function() {
  //     console.log('client disconnected');
  //   });
  
  //   c.write('hello\r\n');
  //   c.pipe(c);
  // });

  // netServer.listen(PORT, HOST);


// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/views/index.html');
//   });


// io.on('connection', function (socket) {
//  // socket.emit('news', { hello: 'world' });
//   socket.emit('news', function (data) {
//     console.log(data);
//   });
// });
// server.listen(3000);

// net.createServer(function(sock) {
//  console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
//  io.sockets.on('connection', function(socket) {
//     io.sockets.emit('emit_from_server', 'connected');
//     sock.on('data', function(data) {
//        var line = data.toString();
//         socket.on('emit_from_client', function(line) {
//       console.log('socket.io server received : '+line);
//       io.sockets.emit('emit_from_server', line);
//     });
//   });
// });

//  sock.on('close', function(data) {
//    console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);

//  });
  
// }).listen(PORT, HOST);

//console.log('Server listening on ' + HOST +':'+ PORT);
