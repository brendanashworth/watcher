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

	// load
	console.log("Loading server type: " + type);
	if (type == 'frontend') {
		var frontend = require("./frontend/server");
	} else if (type == 'daemon') {
		var daemon = require("./daemon/server");
	}
}

// exports
module.exports = {
	start: function() {
		startServer();
	}
};