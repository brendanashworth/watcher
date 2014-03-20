// daemon server.js
var net = require("net");
var stat = require("../stat/retrieve");

var server = net.createServer(function(socket) {
	// get data
	stat.stat(function(data) {
		var json = JSON.stringify(data);
		socket.write(json);
		socket.end();
	});
});

server.listen(3137, '0.0.0.0');