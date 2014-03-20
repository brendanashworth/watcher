// network.js is a controller
var fs = require("fs");

module.exports = {
	// run the controller
	run: function(request, response) {
		// write header
		response.writeHeader(200, {'Content-Type': 'text/html'});

		// read /static/network.html
		fs.readFile(__dirname + '/../../static/network.html', function(err, data) {
			if (err) {
				console.log('Error occured: could not access file ~/static/network.html');
				response.end();
				return;
			}

			response.write(data);

			response.end();
		});
	}
};