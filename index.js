var net = require('net');
const express = require('express');
const app = express();
var path = require("path");

var HOST = '103.137.185.94';
var PORT = 9000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.listen(3000);

net.createServer(function(sock) {
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  sock.on('data', function(data) {
    console.log('DATA :' + data);
  });
 
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);