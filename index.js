var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoClient = require('mongoose');
const router = express.Router();
var user_db = require('./models/user.model')
var net = require('net');
let bodyParser = require('body-parser');
var cors = require('cors');
var HOST = '103.137.185.94';
var PORT = 9000;
const config = require('./db/DB.js');

app.options('*', cors());

// mongoClient.Promise = global.Promise;
// mongoClient.connect(config.DB, { useNewUrlParser: true }).then(
//   () => {console.log('Database is connected') },
//   err => { console.log('Can not connect to the database'+ err)}
// );

app.use(cors());

app.use('/api/users', require('./routes/users'));

//app.enable('trust proxy');

server.listen(3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
        //neu ket noi khong thanh cong thi in ra loi
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
        listSockets[user_test.id]=sock

      });

      /* Sever - lang - nghe */
      // socket.on('my other event', function (data) {
      //   console.log(data);
      // });
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
  db.collection('quotes').find({_name :'Henry'}).next(function(err, doc)
{
  if(err)
  console.log(err);
  res.json(doc);
})
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
