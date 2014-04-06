# retrieve is a controller
net = require 'net'
url = require 'url'
config = require '../../config'

module.exports =
	# run the controller
	run: (request, response) ->
		path = url.parse(request.url).pathname
		id = path.substring(12, path.length)

		if !config.getServers()[id]
			response.writeHead 404
			response.end()
			return

		host = config.getServers()[id].host
		port = config.getServers()[id].port

		connection = net.createConnection {port: port, host: host}
		connection.on 'data', (data) ->
			response.writeHeader 200, {'Content-Type': 'application/json'}
			response.write data
			response.end()
			return

		connection.on 'error', ->
			response.writeHead 500
			response.end()
			return