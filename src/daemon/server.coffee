# daemon server.js
net = require 'net'
stat = require '../stat/retrieve'
config = require '../config'
logger = require '../logging/index'

port = config.getDaemonSettings().port
host = config.getDaemonSettings().host

server = net.createServer (socket) ->
	# get data
	stat.stat (data) ->
		json = JSON.stringify data
		socket.write json
		socket.end()

server.listen port, host

module.exports =
	close: ->
		server.close()

logger.success 'Daemon booted successfully.'