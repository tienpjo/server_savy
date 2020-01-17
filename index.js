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
});
var line;
server_tcp.on('connection', function (sock) {
  var data_filter;
  // io.on('connection', function (socket) {
  sock.on('data', function (data) {
    line = 'GPS_SAVY' + '---->' + sock.remoteAddress.toString() + ' ---->' + data.toString();
    var data_raw = data.toString();
    data_filter = data_raw.split(',');
    var id_device_gps = data_filter[1].split('-').map(Number);
    mapSockets[id_device_gps] = sock;
    var bike_tracking = {
      deviceId: id_device_gps,
      bat: data_filter[2],
      status: data_filter[3],
      lati: data_filter[4],
      long: data_filter[5],
      createdAt: new Date(Date.now)
    };
    var track = new Tracking(bike_tracking);
    track.save(function (err) {
      if (err) throw err;
      console.log('User Test successfully saved.');
    });
    //sock.setTimeout(15000);
  });
  // });
  sock.on('timeout', () => {
    // sock.end();
    // console.log('socket time out');
    // console.log('Connection closed');
    // var index = mapSockets.indexOf(sock);
    // if (index !== -1) {
    //   delete mapSockets[index];
    //   console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    // }
  });
  sock.on('error', () => {

  });

});
io.on('connection', function (socket) {
  socket.emit('news', line);
});
