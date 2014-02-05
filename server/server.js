// server.js

var http = require("http");
var url  = require("url");

// require routes
var routes = require("./routes");

function onRequest(request, response) {
	// search for the route
	var path = url.parse(request.href);

	// write header
	response.writeHeader(200, {'Content-Type': 'text/html'});

	// write body
	response.write('Hello!');
	response.write('You visited ' + path);

	// end
	response.end();
}

var server = http.createServer(onRequest).listen(8080);