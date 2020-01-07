var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoClient = require('mongoose');
const router = express.Router();
const tracking = require('./models/tracking');
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

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
server.listen(3000);

app.use(cors());
app.use(jwt());

initAPIs(app);
app.use(errHandler);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let mapSockets = [];
const server_tcp = net.createServer();
server_tcp.listen(PORT, HOST, () => {
  console.log('TCP Server is running on port ' + PORT + '.');
});

server_tcp.on('connection', function (sock) {
  io.on('connection', function (socket) {
    socket.on('bat-xe-tu-xa', function (data) {
      console.log(data);
      mapSockets[data].write('MOTO_ON');
    });
    socket.on('tat-xe-tu-xa', function (data) {
      console.log(data);
      mapSockets[data].write('MOTO_OFF');
    });
    sock.on('data', function (data) {
      console.log('DATA ' + sock.remoteAddress + ': ' + data);
      var data_raw = data.toString();
      var data_filter = data_raw.split(',');
      var id_device_gps = parseInt(data_filter[0], 10);
      mapSockets[id_device_gps] = sock;
      // action save mongodb
      mongoClient.connect('mongodb://127.0.0.1:27017/db_server', function (err, db) {
        var bike_tracking = new tracking({
          _id: new mongoClient.Types.ObjectId(),
          deviceId: data_filter[0],
          long: data_filter[1],
          lati: data_filter[2],
          date: Date.now()
        });
        bike_tracking.save(function (error) {
          if (err) throw err;
          console.log('User Test successfully saved.');
        })
        sock.setTimeout(25000);
      });
    });
    sock.on('timeout', () => {
      console.log('socket time out');
      console.log('Connection closed');
      sock.end();
    });
  });
  sock.on('close', () => {
    let index = mapSockets.findIndex(function (o) {
      return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
    })
    if (index !== -1) mapSockets.splice(index, 1);
    console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
  });
});

