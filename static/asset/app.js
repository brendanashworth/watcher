var app = angular.module('watcherjsApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/:server', {
			controller: "ServerController",
			templateUrl: "/asset/app/view/server.html"
		});
		/*.otherwise({
			redirectTo: "/#/"
		});*/
});