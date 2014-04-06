var app = angular.module('WatcherApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/view/:server', {
			controller: "BodyController",
			templateUrl: "/asset/app/view/server.html"
		})
		.when('/', {
			controller: "ViewController",
			templateUrl: "/asset/app/view/all.html"
		})
		.otherwise({
			redirectTo: '/'
		});
});

app.controller('BodyController', function($scope, $http, $routeParams) {
	$scope.serverid = $routeParams.server;

	$http.get($scope.serverid ? '/get/server/' + $scope.serverid : '/get/server/1').success(function(data) {
		var parsed = {
			cores: data.num_cpu,
			loadavg: {
				one: data.load_average.one_min,
				five: data.load_average.five_min,
				fifteen: data.load_average.fifteen_min
			},
			ram: {
				free: data.mem_usage.free,
				total: data.mem_usage.total,
				used: data.mem_usage.total - data.mem_usage.free
			},
			disks: {},
			uptime: getAmountInTime(data.node_uptime),
			hostname: data.node_hostname
		};

		console.log(data.disk_usage);
		for(var i = 0; i < data.disk_usage.length; i++) {
			console.log('hi');
			parsed.disks.push({
				system: data.disk_usage[i].system,
				used: getAmount(data.disk_usage[i].used),
				available: getAmount(data.disk_usage[i].available),
				percent: data.disk_usage[i].percent
			});
		}

		$scope.server = parsed;
	});
});

app.controller('HeaderController', function($scope, $http) {
	$http.get('/get/servers').success(function(data) {
		$scope.servers = data;
	});
});

app.controller('ViewController', function($scope) {
	$scope.welcome = 'Welcome';
});