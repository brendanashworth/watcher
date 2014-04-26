var app = angular.module('watcherApplication', ['ngRoute', 'angularCharts']);

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

// View server
app.controller('ServerController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
	$http({method: 'GET', url: '/get/server/' + $routeParams.id})
		.success(function(data, status, headers, config) {
			console.log(data);

			data.mem_usage.used = parseInt(data.mem_usage.total - data.mem_usage.free);

			data.mem_usage.percent_total = '100',
			data.mem_usage.percent_free = Math.round((data.mem_usage.free / data.mem_usage.total) * 100),
			data.mem_usage.percent_used = Math.round((data.mem_usage.used / data.mem_usage.total) * 100);

			// Free ram circle
			Circles.create({
				id:         'js-'+$routeParams.id+'-free-ram',
				percentage: data.mem_usage.percent_free,
				radius:     100,
				width:      10,
				number:     data.mem_usage.percent_free,
				text:       '%',
				colors:     ['#41DB00', '#92ED6b'],
				duration:   100
			});
			// used ram circle
			Circles.create({
				id:         'js-'+$routeParams.id+'-used-ram',
				percentage: data.mem_usage.percent_used,
				radius:     100,
				width:      10,
				number:     data.mem_usage.percent_used,
				text:       '%',
				colors:     ['#A60000', '#FB717E'],
				duration:   100
			});
			// cpu load circle
			Circles.create({
				id:         'js-'+$routeParams.id+'-cpu',
				percentage: parseInt(data.load_average.one_min),
				radius:     100,
				width:      10,
				number:     parseInt(data.load_average.one_min),
				text:       '%',
				colors:     ['#00665E', '#009D91'],
				duration:   100
			});
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});

	$scope.greeting = 'Hola!';
}]);

// Overview controller
app.controller('OverviewController', ['$scope', function($scope) {
	$scope.welcome = "sup";
}]);