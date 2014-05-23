# server
config = require './config'
logger = require './logging/index'

# start server
start = ->
	logger.info 'Starting watcher.js...'

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
	return

# exports
module.exports =
	start: ->
		start()