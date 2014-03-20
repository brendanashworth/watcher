// config.js
var fs   = require("fs");
var yaml = require("js-yaml");

module.exports = {
	getServerType: function() {
		var contents = fs.readFileSync("./app.yml", {encoding: 'utf8'});

		var yml = yaml.safeLoad(contents);

		return yml.settings.server_type;
	}
};