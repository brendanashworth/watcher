// server.js
var config   = require("./config");

// start server
function startServer() {
	// get type
	var type = config.getServerType();

	// undefined server type
	if (type != 'frontend' && type != 'daemon') {
		console.log("Error reading app.yml: server type '" + type + "' is not supported, loading 'frontend'.");
		type = 'frontend';
	}

	config.getServers();

	// load
	console.log("Loading server type: " + type);
	if (type == 'frontend') {
		// frontend also starts a server
		var frontend = require("./frontend/server");
		require("./daemon/server");
	} else if (type == 'daemon') {
		// just the daemon
		var daemon = require("./daemon/server");
	}
}

// exports
module.exports = {
	start: function() {
		startServer();
	}
};