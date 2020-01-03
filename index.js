var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoClient = require('mongoose');
const router = express.Router();
const tracking = require('./models/tracking');
const socket = require('./models/socket.model');
const dbs = require('./_helpers/database');
const Socket_Get = dbs.Socket;
var net = require('net');
let bodyParser = require('body-parser');
var cors = require('cors');
var HOST = '103.137.185.94';
var PORT = 9000;
const jwt = require('./_helpers/jwt');
var errHandler = require('./_helpers/error-handler')
const initAPIs = require('./routes/user');
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());
app.use(jwt());

initAPIs(app);
app.use(errHandler);
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
  // listSockets.push(sock);
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
      // mongoClient.connect('mongodb://127.0.0.1:27017/db_server', function (err, db) {
      //   var bike_tracking = new tracking({
      //     _id: new mongoClient.Types.ObjectId(),
      //     id_device: data_filter[0],
      //     long: data_filter[1],
      //     lati: data_filter[2],
      //     date: Date.now()
      //   });
      //   var listSocket = new socket({
      //     _id: bike_tracking._id,
      //     id_device: data_filter[0],
      //     hw_connect: sock
      //   });
      //   id_socket = listSockets._id;
      //   listSocket.save(function (error) {
      //     if (error) throw error;
      //     console.log(' Save socket successfully saved.');
      //   });
      //   // listSockets.id = bike_tracking._id;
      //   // listSockets.
      //   bike_tracking.save(function (error) {
      //     if (err) throw err;
      //     console.log('User Test successfully saved.');
      //   })
      //   sock.setTimeout(5000);
      //   socket.on('bat-xe-tu-xa', function (data) {
      //     // console.log(data);
      //     const socket_hw = Socket_Get.find({ "hw_connect": data });
      // console.log(socket_hw);
      // socket_hw.hw_connect.write(sock.remoteAddress + ':' + sock.remotePort + ':' + data);
      // });
      // socket.on('tat-xe-tu-xa', function (data) {
      //   console.log(data);
      // });
      // });
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