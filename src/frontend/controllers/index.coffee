# index.js is a controller
fs = require 'fs'
config = require '../../config'

module.exports =
	# run the controller
	run: (request, response) ->
		# write header
		response.writeHeader 200, {'Content-Type': 'text/html'}

		# read /static/network.html
		fs.readFile __dirname + '/../../../static/index.html', {encoding: 'utf8'}, (err, data) ->
			if err
				console.log 'Error occured: could not access file ~/static/index.html'
				response.end()
				return
			
			response.write data
			response.end()