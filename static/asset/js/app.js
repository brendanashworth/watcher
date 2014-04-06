var app = angular.module('Application', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			controller: 'Overview',
			templateUrl: 'app/views/overview.html'
		})
		.when('/server/:id', {
			controller: 'ViewServer',
			templateUrl: 'app/views/server.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});