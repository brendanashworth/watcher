// network.js is a controller
var fs    = require("fs");

module.exports = {
	// run the controller
	run: function(request, response) {
		// write header
		response.writeHeader(404, {'Content-Type': 'text/html'});

		// read /static/network.html
		fs.readFile(__dirname + '/../../static/404.html', function(err, data) {
			if (err) {
				console.log('Error occured: could not access file ~/static/404.html');
				response.end();
				return;
			}

			response.write(data);

			response.end();
		});
	}
};