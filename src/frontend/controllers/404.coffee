# network is a controller
fs = require 'fs'

module.exports = (request, response) ->
		# write header
		response.writeHeader 404, {'Content-Type': 'text/html'}

		# read /static/network.html
		fs.readFile __dirname + '/../../../static/404.html', (err, data) ->
			if err
				console.log 'Error occured: could not access file ~/static/404.html'
				response.end()
				return

			response.write data
			response.end()