// index.js is a controller

module.exports = {
	// run the controller
	run: function(request, response) {
		// write header
		response.writeHeader(200, {'Content-Type': 'text/html'});

		// write body
		response.write('<html><body>Welcome to the index! <a href="/network">Click for network</a></body></html>');

		// end
		response.end();
	}
};