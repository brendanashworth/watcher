// index.js is a controller
var fs = require("fs");

module.exports = {
	// run the controller
	run: function(request, response) {
		// write header
		response.writeHeader(200, {'Content-Type': 'text/css'});

		// read /static/network.html
		fs.readFile(__dirname + '/../../static/asset/watcher.css', function(err, data) {
			if (err) {
				console.log('Error occured: could not access file ~/static/asset/watcher.css');
				response.end();
				return;
			}

			response.write(data);

			response.end();
		});
	}
};