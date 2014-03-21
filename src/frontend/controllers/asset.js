// asset.js is a controller
var fs = require("fs");
var url = require("url");
var path = require("path");
var mime = require("mime");

module.exports = {
	// run the controller
	run: function(request, response) {
		// get the file uri
		var uri = url.parse(request.url).pathname;
		var path = "static/asset/" + uri.substring(7, uri.length);

		// check if path contains '..'
		if(path.indexOf('..') > -1) {
			response.writeHeader(500, {'Content-Type': 'text/plain'});
			response.write("Error: Path cannot contain '..'.");
			response.end();
			return;
		}

		// check if file exists
		fs.readFile(path, {encoding: 'utf8'}, function(err, data) {
			if (err) {
				response.writeHeader(404, {'Content-Type': 'text/plain'});
				response.write('404: Asset not found');
				response.end();
				return;
			}

			console.log(path);
			var mimetype = mime.lookup(path);

			response.writeHeader(200, mimetype);
			response.write(data, "binary");
			response.end();

			return;
		});
	}
};