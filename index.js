var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoClient = require('mongoose');
const router = express.Router();
var user_db = require('./models/device.model')
var net = require('net');
let bodyParser = require('body-parser');
var cors = require('cors');
var HOST = '103.137.185.94';
var PORT = 9000;
var session = require('express-session');
var errHandler = require('./_helpers/error-handler')
const jwt = require('./_helpers/jwt');

app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/api/device', require('./routes/device'));
app.use(jwt());
app.use('/api/users',require('./routes/user'));
app.use(errHandler);
server.listen(3000);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const listSockets = {}

function sendToSocket(userId, message) {
  listSockets[userId].send(message)
}
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

      mongoClient.connect('mongodb://127.0.0.1:27017/db_server', function (err, db) {
        // neu ket noi khong thanh cong thi in ra loi
        if (err) throw err;
        // neu thanh cong thi log ra thong bao
        console.log('Ket noi thanh cong');
        // socket.emit('news', 'Ket Noi Thanh Cong Database');
        var user_test = new user_db({
          _id: new mongoClient.Types.ObjectId(),
          Lon: data_filter[1],
          Lati: data_filter[2],
          ID_Device: data_filter[0]
        });
        user_test.save(function (error) {
          if (err) throw err;
          console.log('User Test successfully saved.');
        })
        listSockets[user_test.id] = sock
      });
    });
  });
  // Add a 'close' event handler to this instance of socket
  sock.on('close', function (data) {
    console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
  });
}).listen(PORT, HOST);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/quotes', (req, res) => {
  db.collection('quotes').find({ _name: 'Henry' }).next(function (err, doc) {
    if (err)
      console.log(err);
    res.json(doc);
  })
});

