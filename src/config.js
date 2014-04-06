// config.js
var fs   = require("fs");
var yaml = require("js-yaml");

// get the parsed configuration file
function getConfigContents() {
	var contents = fs.readFileSync("./app.yml", {encoding: 'utf8'});
	return yaml.safeLoad(contents);
}

module.exports = {
	getServerType: function() {
		var file = getConfigContents();
		return file.settings.server_type;
	},

	getServers: function() {
		var file = getConfigContents();
		return file.servers;
	},

	getDaemonSettings: function() {
		var file = getConfigContents();
		return file.settings.daemon;
	},

	getFrontendSettings: function() {
		var file = getConfigContents();
		return file.settings.frontend;
	}
};