// frontend server.js
var http = require("http");
var url  = require("url");

var store  = require("../storage/storecpu");
var routes = require("./routes").routes;

function onRequest(request, response) {
	var controller = require("./controllers/" + routes['404'].controller);
	var path = request.url;

	// check if a route exists for this path
	var keys = Object.keys(routes);
	for (var i = 0; i < keys.length; i++) {
		var regex = new RegExp(keys[i]);

		if(regex.test(request.url)) {
			var contpath = routes[keys[i]];
			controller = require("./controllers/" + contpath.controller);
		}
	}

	controller.run(request, response);
}

var server = http.createServer(onRequest).listen(8080);

// set repeating tasks
setInterval(store.statCPU, 300000);