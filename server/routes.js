// routes.js

module.exports = {
	routes : {
		'/' : {
			'controller': 'index'
		},
		// network
		'/network' : {
			'controller': 'network'
		},
		// network status
		'/network/status': {
			'controller': 'network/status'
		},
		// 404
		'404': {
			'controller': '404'
		},
		// assets
		'/asset/watcher.css': {
			'controller': 'asset'
		}
	}
};