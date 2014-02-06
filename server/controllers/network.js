// network.js is a controller

module.exports = {
	// run the controller
	run: function(request, response) {
		// write header
		response.writeHeader(200, {'Content-Type': 'text/plain'});

		// write body
		response.write('Welcome to the network page!');

		// end
		response.end();
	}
};