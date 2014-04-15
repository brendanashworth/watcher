# server
config = require './config'

# start server
start = ->
	# get type
	type = config.getServerType()

	# undefined server type
	if type isnt 'frontend' and type isnt 'daemon'
		console.log "Error reading app.yml: server type #{type} is not supported, loading 'frontend'."
		type = 'frontend'

	config.getServers()

	# load
	console.log "Loading server type: #{type}"
	if type is 'frontend'
		# frontend also starts a server
		frontend = require './frontend/server'
		daemon   = require './daemon/server'
	else if type is 'daemon'
		# just the daemon
		daemon   = require './daemon/server'
	return

# exports
module.exports =
	start: ->
		start()