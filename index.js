var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoClient = require('mongoose');
const router = express.Router();
const tracking = require('./models/tracking');
const dbs = require('./_helpers/database');
const Tracking = dbs.Tracking;
const hw = dbs.HwConnect;
const processData = require('./middleware/processData');
var net = require('net');
let bodyParser = require('body-parser');
var cors = require('cors');
var HOST = '103.137.185.94';
var PORT = 9000;
const jwt = require('./_helpers/jwt');
var errHandler = require('./_helpers/error-handler')
const initAPIs = require('./routes/user');

server.listen(3000);

const server_tcp = net.createServer();
server_tcp.listen(PORT, HOST, () => {
  console.log('TCP Server is running on port ' + PORT + '.');
});

app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

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

app.post('/users/actionCtrl', function (req, res) {
  console.log(req.body.deviceId);
  if (req.body.actionCtrl == "OFF") {
    mapSockets[req.body.deviceId].write('MOTO_OFF');
  }
  res.json('ControlSuccess');
  //res.status(200).json;
});


server_tcp.on('connection', function (sock) {
  var data_filter;
  var id_device_gps;
  var line;
  // io.on('connection', function (socket) {
  sock.on('data', function (data) {
    line = 'GPS_SAVY' + '---->' + sock.remoteAddress.toString() + ' ---->' + data.toString();
    console.log(line);
    var data_raw = data.toString();
    data_filter = data_raw.split(',');
    if (data_filter[0] == "MOTO-ID") {
      id_device_gps = data_filter[1].split('-').map(Number);
      console.log(id_device_gps);
      mapSockets[id_device_gps] = {sock,id_device_gps};
    }
    else if (data_filter[0] == "MOTO-RUNNING" || data_filter[0] == "MOTO-STOPING") {
      id_device_gps = data_filter[1].split('-').map(Number);
      mapSockets[id_device_gps] = sock;
      processData.getTracking(data_filter, id_device_gps);
    }
    else if (data_filter[0] == "MOTO-GPS") {
      id_device_gps = data_filter[1].split('-').map(Number);
      mapSockets[id_device_gps] = sock;
      processData.getStt(data_filter, id_device_gps);
    }
    // sock.setTimeout(15000);
  });
  // });
  sock.on('timeout', () => {
  });
  sock.on('error', () => {
  });
  sock.on('close', function (data) {
    // console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    // let index = mapSockets.findIndex(function (o) {
    //   return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
    // })
     console.log(mapSockets[[22, 157, 252, 62, 188, 105, 221, 220]])
    var index = mapSockets.findIndex(i => [[i.remoteAddress]] == [[sock.remoteAddress]]);
    console.log(index);
    // if (index !== -1) mapSockets.splice(index, 1);
    // console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
  });
});
io.on('connection', function (socket) {
  socket.emit('news', line);
});
