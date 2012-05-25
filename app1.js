var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index1.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
var chat = "";
io.sockets.on('connection', function (socket) {
  io.sockets.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data.my);
  });
  
  socket.on('message', function (data) {
	console.log(data.sendmessage);
	chat = data.sendmessage;
	socket.broadcast.emit('replymessage',{replymessage:chat});
	socket.emit("aaa", 'tobi', "from aaaa", 'aaaaaa', function(ok)
													 {
														 console.log(ok);
													 });
  });
  
  socket.on("disconnect", function() {
	io.sockets.emit("user disconnected");
	console.log("user disconnected");
  });
});
