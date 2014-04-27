# frontend server.js
http = require 'http'
net  = require 'net'
url  = require 'url'
buffer = require 'buffer'

store  = require '../storage/storecpu'
routes = require './routes'
config = require '../config'

onRequest = (request, response) ->
	controller = require './controllers/' + routes['404'].controller
	path = request.url

	# check if a route exists for this path
	keys = Object.keys routes
	for key, value in keys
		regex = new RegExp(key)

		if regex.test request.url
			contpath = routes[key];
			controller = require './controllers/' + contpath.controller

	controller.run request, response
	return

server = http.createServer onRequest
server.listen config.getFrontendSettings().port

# set repeating tasks
setInterval store.statCPU, 300000