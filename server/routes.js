var routes = {
	// index
	'/' : {
		'controller' : 'index'
	},
	// network
	'/network' : {
		'controller' : 'network'
	},
	// network status
	'/network/status' : {
		'controller' : 'network/status'
	}

};

// get the routes
function getRoutes() {
	// Get the routes
	return routes;
}