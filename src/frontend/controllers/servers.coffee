# index.js is a controller
config = require '../../config'

module.exports = (request, response) ->
	# write header
	response.writeHeader 200, {'Content-Type': 'application/json'}

	# get servers
	json = JSON.stringify config.getServers()

	response.write json
	response.end()