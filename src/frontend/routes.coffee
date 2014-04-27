# routes.js
module.exports =
	'^/$':
		'controller': 'index'
	# json returns
	'^/get/servers/status$':
		'controller': 'overview'
	'^/get/server/(.)+$':
		'controller': 'retrieve'
	'^/get/servers$':
		'controller': 'servers'
	# 404
	'404':
		'controller': '404'
	# assets
	'^/asset/(.)+$':
		'controller': 'asset'