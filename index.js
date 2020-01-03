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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
let mapSockets = {};
const server_tcp = net.createServer();

server_tcp.listen(PORT, HOST, () => {
  console.log('TCP Server is running on port ' + PORT + '.');
});

server_tcp.on('connection', function (sock) {
  console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
  // Add a 'data' event handler to this instance of socket
  io.on('connection', function (socket) {

    socket.on('bat-xe-tu-xa', function (data) {
      console.log(data);
      const socket_hw = mapSockets[data];
      socket_hw.sock.write(sock.remoteAddress + ':' + sock.remotePort + ':' + data);
    });

    sock.on('data', function (data) {
      console.log('DATA ' + sock.remoteAddress + ': ' + data);
      var data_raw = data.toString();
      var data_filter = data_raw.split(',');
      let client_socket = ({
        id_device: data_filter[0],
        hw_connect: sock
      });
      mapSockets[client_socket.id_device] = client_socket;
      // Add a 'close' event handler to this instance of socket
      sock.on('close', function (data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
      });
    });
  });
  sock.on('timeout', () => {
    console.log('socket time out');
    console.log('Connection closed');
    console.log('CLOSED: ' + sock.remoteAddress + ':' + sock.remotePort);
    const socket_del = Socket_Get.find({ hw_connect: [sock] });
    console.log(socket_del);
    if (socket_del) {
      Socket_Get.findByIdAndRemove(socket_del._id);
      sock.end();
    }
  });
  sock.on('end', () => {
    var idx = mapSockets.indexOf(sock);
    if (idx != -1) {
      delete sockets[idx];
    }
  });
});
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
