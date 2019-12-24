var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoClient = require('mongoose');
const router = express.Router();
const dbs = require('../_helpers/database');
var net = require('net');
let bodyParser = require('body-parser');
var cors = require('cors');
var HOST = '103.137.185.94';
var PORT = 9000;
const jwt = require('./_helpers/jwt');
var errHandler = require('./_helpers/error-handler')
const initAPIs = require('./routes/user');
const Tracking = dbs.Tracking;

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
const listSockets = {}

net.createServer(function (sock) {
  // We have a connection - a socket object is assigned to the connection automatically
  console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
  // Add a 'data' event handler to this instance of socket
  io.on('connection', function (socket) {
    sock.on('data', function (data) {
      // console.log('DATA ' + sock.remoteAddress + ': ' + data);
      var line = 'GPS_SAVY' + '---->' + new Date().toISOString() + '---->' + sock.remoteAddress.toString() + ' ---->' + data.toString();
      socket.emit('news', line);
      /* Split mang data */
      var data_raw = data.toString();
      var data_filter = data_raw.split(',');
      var bike_tracking = new Tracking({
        _id: new mongoClient.Types.ObjectId(),
        id_device: data_filter[0],
        long: data_filter[1],
        lati: data_filter[2],
        date: Date.now()
      });
      bike_tracking.save(function (error) {
        if (err) throw err;
        console.log('User Test successfully saved.');
      })
    });
  });
  sock.on('close', function (data) {
    console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
  });
}).listen(PORT, HOST);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});