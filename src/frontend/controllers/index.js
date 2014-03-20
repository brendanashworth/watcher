// index.js is a controller
var fs = require("fs");
var config = require("../../config");
var mustache = require("mustache");

module.exports = {
	// run the controller
	run: function(request, response) {
		// write header
		response.writeHeader(200, {'Content-Type': 'text/html'});

		// read /static/network.html
		fs.readFile(__dirname + '/../../../static/index.html', {encoding: 'utf8'}, function(err, data) {
			if (err) {
				console.log('Error occured: could not access file ~/static/index.html');
				response.end();
				return;
			}

			//var servers = config.getServers();
			//var output = mustache.render(data, demoData);

			response.write(data);
			response.end();
		});
	}
};