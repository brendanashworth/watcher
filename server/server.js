// server.js

var http = require("http");
var url  = require("url");

// require routes
var routes = require("./routes");

function onRequest(request, response) {
	var path = request.url;
	
	if(routes[path] instanceof undefined || routes[path] == 'undefined') {
		console.log('404');
	} else {
		console.log('in array, controller: ' + routes[path]['controller']);
	}

	// write header
	response.writeHeader(200, {'Content-Type': 'text/html'});

	// write body
	response.write('Hello!');

	// end
	response.end();
}

var server = http.createServer(onRequest).listen(8080);