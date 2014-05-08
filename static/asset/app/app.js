var app = angular.module('watcherApplication', ['ngRoute', 'chartjs']);

// Configure routes
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/asset/app/view/overview.html',
			controller: 'OverviewController'
		})
		.when('/server/:id', {
			templateUrl: '/asset/app/view/server.html',
			controller: 'ServerController'
		});
}]);

function getAmount(data) {
	data = parseInt(data);

	// go through
	if(data > 1024 * 10) {
		if(data / 1024 > 1024 * 10) {
			if(data / Math.pow(1024, 2) > 1024 * 10) {
				if(data / Math.pow(1024, 3) > 1024 * 10) {
					return Math.round(data / Math.pow(1024, 3)) + 'TB';
				} else {
					return Math.round(data / Math.pow(1024, 2)) + 'GB';
				}
			} else {
				return Math.round(data / Math.pow(1024, 2)) + 'MB';
			}
		} else {
			return Math.round(data / 1024) + 'KB';
		}
	} else {
		return data + ' bytes';
	}
}

function toGhz(data) {
	data = parseInt(data);

	data = data * 0.001;
	return data;
}