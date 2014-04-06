// daemon server.js
var net = require("net");
var stat = require("../stat/retrieve");
var config = require("../config");

var port = config.getDaemonSettings().port,
	host = config.getDaemonSettings().host;

var server = net.createServer(function(socket) {
	// get data
	stat.stat(function(data) {
		var json = JSON.stringify(data);
		socket.write(json);
		socket.end();
	});
});

server.listen(port, host);