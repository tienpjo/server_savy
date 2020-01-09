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

io.on('connection', function (socket) {
  socket.on('bat-xe-tu-xa', function (data) {
    console.log(data);
    mapSockets[data].write('MOTO_ON');
  });
  socket.on('tat-xe-tu-xa', function (data) {
    console.log(data);
    mapSockets[data].write('MOTO_OFF');
  });
});
server_tcp.on('connection', function (sock) {
  sock.on('data', function (data) {
    //  console.log('DATA ' + sock.remoteAddress + ': ' + data);
    var data_raw = data.toString();
    var data_filter = data_raw.split(',');
    // var id_device_gps = parseInt(data_filter[0], 10);
    // mapSockets[id_device_gps] = sock;
    var bike_tracking = {
      deviceId: data_filter[0],
      long: data_filter[1],
      lati: data_filter[2],
      date: Date.now()
    };
    var hwConnect = {
      deviceId: data_filter[0],
      hwConnect: sock
    };
    var hwConnect_save = new hw(hwConnect);
    hwConnect_save.save(function (err) {
      if (err) throw err;
      console.log('Save hw SOCKet.');
    });

    var track = new Tracking(bike_tracking);
    track.save(function (err) {
      if (err) throw err;
      console.log('User Test successfully saved.');
    });
    sock.setTimeout(15000);
  });

  sock.on('timeout', () => {
    sock.end();
    console.log('socket time out');
    console.log('Connection closed');
    // var index = mapSockets.indexOf(sock);
    // if (index !== -1) {
    //   delete mapSockets[index];
    //   console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    // }
  });
  sock.on('error', () => {

  });
});

