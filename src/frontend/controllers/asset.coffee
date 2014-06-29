# asset.js is a controller
fs   = require 'fs'
url  = require 'url'
path = require 'path'
mime = require 'mime'

module.exports = (request, response) ->
		# get the file uri
		uri = url.parse request.url
		uri = uri.pathname
		path = "dist/static/asset/" + uri.substring 7, uri.length

		# check if path contains '..'
		if path.indexOf('..') > -1
			response.writeHeader 500, {'Content-Type': 'text/plain'}
			response.write "Error: Path cannot contain '..'."
			response.end()
			return

		# check if file exists
		fs.readFile path, {encoding: 'utf8'}, (err, data) ->
			if err
				response.writeHeader 404, {'Content-Type': 'text/plain'}
				response.write '404: Asset not found'
				response.end()
				return

			mimetype = mime.lookup path

			response.writeHeader 200, {'Content-Type': mimetype}
			response.write data, "binary"
			response.end()