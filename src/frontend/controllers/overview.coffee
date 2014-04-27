# overview is a controller
net = require 'net'
url = require 'url'
config = require '../../config'

module.exports =
	# run the controller
	run: (request, response) ->
		servers = config.getServers()
		timeouts = []
		connections = []

		for id, server of servers
			timeouts[id] = setTimeout(->
				if not servers[id].online?
					servers[id].online = false
			, 5000)

			connections[id] = net.createConnection {port: server.port, host: server.host}, do ->
				servers[id].online = true
				clearTimeout(timeouts[id])

		setTimeout( ->
			response.writeHead 200
			response.write(JSON.stringify servers)
			response.end()
		, 5500)