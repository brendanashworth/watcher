// index.js is a controller
var config = require("../../config");

module.exports = {
	// run the controller
	run: function(request, response) {
		// write header
		response.writeHeader(200, {'Content-Type': 'application/json'});

		// get servers
		var servers = config.getServers();
		response.write(JSON.stringify(servers));
		response.end();
	}
};