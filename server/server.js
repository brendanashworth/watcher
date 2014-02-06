// server.js

var http = require("http");
var url  = require("url");
var fs   = require("fs");

var routes = require("./routes");

function onRequest(request, response) {
	var path = request.url;

	// check if a route exists for this path
	if(routes.routes[path]) {
		var controller = require("./controllers/" + routes.routes[path].controller);
		controller.run(request, response);
	} else {
		// route not defined. 404
		response.writeHeader(404, {'Content-Type': 'text/html'});

		// load ./static/404.html
		fs.readFile(__dirname + '/../static/404.html', function(err, data) {
			if (err) {
				// did someone remove the page or something
				console.log('Error occured: could not access file ~/static/404.html');
				response.end();
				return;
			}

			response.write(data);

			response.end();
		});

	}
}

var server = http.createServer(onRequest).listen(8080);