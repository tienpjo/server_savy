var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var gps_server = require('http').createServer(app);
var io_socket = require('socket.io').listen(gps_server);
users = [];
srv_connect = [];


gps_server.listen(PORT,function () {
    console.log('Server running ... !!');
});

.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', function(req,res)
{
    res.sendFile(__dirname + '/index.html');
});

io_socket.sockets.on('connection', function (socket) {
    socket.on("client-send",function (data) {
        console.log("Server vua nhan duoc data la: " + JSON.stringify(data));
        io_socket.sockets.emit("server-recv",data);
    });
});