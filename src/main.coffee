# server
config = require './config'
logger = require './logging/index'

# start server
start = ->
	logger.info 'Starting watcher.js... [^C to quit]'

	# get type
	type = config.getServerType()

	# undefined server type
	if type isnt 'frontend' and type isnt 'daemon'
		logger.error "Error reading app.yml: server type \"#{type}\" is not supported; loading 'frontend' instead."
		type = 'frontend'

	config.getServers()

	# load
	if type is 'frontend'
		logger.info 'Loading server type: frontend (+daemon)'
		# frontend also starts a server
		frontend = require './frontend/server'
		daemon   = require './daemon/server'
	else if type is 'daemon'
		logger.info 'Loading server type: daemon'
		# just the daemon
		daemon   = require './daemon/server'

	# If we're starting the server, lets listen for shut down.
	process.on 'SIGINT', ->
		logger.raw '' # We send down an empty line so that we clear the ^C line.
		logger.info 'Shutting down watcher.js...'

		daemon.close()
		frontend.close()

		logger.success 'Successfully shut down.'

		process.exit()

	return

# exports
module.exports =
	start: ->
		start()