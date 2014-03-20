// frontend server.js
var http = require("http");
var url  = require("url");

var store  = require("../storage/storecpu");
var routes = require("../routes").routes;

function onRequest(request, response) {
	var controller, path = request.url;

	// check if a route exists for this path
	if(routes[path]) {
		controller = require("./controllers/" + routes[path].controller);
		controller.run(request, response);
	} else {
		// route not defined. 404
		controller = require("./controllers/" + routes['404'].controller);
		controller.run(request, response);
	}
}

var server = http.createServer(onRequest).listen(8080);

// set repeating tasks
setInterval(store.statCPU, 300000);