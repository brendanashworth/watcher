// retrieve.js is a controller
var stat  = require("../../stat/retrieve");

module.exports = {
	// run the controller
	run: function(request, response) {
		stat.stat(function(data) {
			var json = JSON.stringify(data);
			response.write(json);
			response.end();
		});
	}
};