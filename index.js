var WebSocketServer = require('websocket').server;
var http = require('http');
var webSocketsServerPort = 9000;
var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(webSocketsServerPort, function() { 
    console.log(" Server is listening on port "
      + webSocketsServerPort);
});

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
        console.log((new Date()) + ' Received Message '
        + ': ' + message.utf8Data);
    }
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});