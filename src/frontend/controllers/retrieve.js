// retrieve.js is a controller
var url = require("url");
var net = require("net");
var stat = require("../../stat/retrieve");
var config = require("../../config");
var storecpu = require("../../storage/storecpu");

module.exports = {
	// run the controller
	run: function(request, response) {
		// get the server id
		var id = (url.parse(request.url).pathname).substring(12, (url.parse(request.url).pathname).length);

		// check if it exists
		if(config.getServers()[id]) {
			var host = config.getServers()[id].host;
			var port = config.getServers()[id].port;

			var socket = net.createConnection(port, host);
			socket.on('data', function(data) {
				response.writeHead(200);
				response.write(data);
				response.end();
			});
			socket.on('error', function() {
				response.writeHead(500);
				response.end();
			});
		} else {
			response.writeHead(404);
			response.end();
		}

		stat.stat(function(data) {
			var json = data;
			json.pastCPU = storecpu.getData();
			json = JSON.stringify(json);
			response.write(json);
			response.end();
		});
	}
};