// server.js

var http = require("http");
var url  = require("url");

// get the routes
var routes = {
	// index
	'/' : {
		'controller' : 'index'
	},
	// network
	'/network' : {
		'controller' : 'network'
	},
	// network status
	'/network/status' : {
		'controller' : 'network/status'
	}

};

function onRequest(request, response) {
	var path = request.url;

	if(inArray(routes, path)) {
		console.log('in');
	} else {
		console.log('out');
	}

	// write header
	response.writeHeader(200, {'Content-Type': 'text/html'});

	// write body
	response.write('Hello!');

	// end
	response.end();
}

var server = http.createServer(onRequest).listen(8080);