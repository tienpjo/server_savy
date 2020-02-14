var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const dbs = require('./_helpers/database');
const hw = dbs.hwConnect;
const processData = require('./middleware/processData');
var net = require('net');
let bodyParser = require('body-parser');
var cors = require('cors');
var HOST = '103.137.185.94';
var PORT = 9000;
const jwt = require('./_helpers/jwt');
var errHandler = require('./_helpers/error-handler')
const initAPIs = require('./routes/user');
const DeviceManagerApi = require('./routes/managerDevice');
const UserManagerApi = require('./routes/managerUser');
const hwTest = require('./_service/connect/hwConnect.service')
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


app.use(errHandler);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
DeviceManagerApi(app);
UserManagerApi(app);
initAPIs(app);
let mapSockets = [];

app.post('/users/actionCtrl', function (req, res) {
  if (req.body.actionCtrl == "OFF") {
    mapSockets[req.body.deviceId].write('MOTO_OFF');
  }
  res.json('ControlSuccess');
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
      mapSockets[id_device_gps] = sock;
      var hwConnect = {
        deviceId: id_device_gps,
        sockConnect: sock
      }
      var bikeSock = new hw(hwConnect);
      bikeSock.save(function (err) {
        if (err) throw err;
        console.log('Save SOCKET Succesfully.');
      });
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
    hwTest.findhwConnect(sock.remoteAddress);
    // console.log(hwSock);
    // console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    // let index = mapSockets.findIndex(function (o) {
    //   return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
    // })
    // console.log(mapSockets[[22, 157, 252, 62, 188, 105, 221, 220]])
    // var index = mapSockets.findIndex(i => i.);
    // console.log(index);
    // if (index !== -1) mapSockets.splice(index, 1);
    // console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
  });
});
io.on('connection', function (socket) {
  socket.emit('news', line);
});
