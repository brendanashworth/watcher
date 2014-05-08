// Overview controller
app.controller('OverviewController', ['$scope', '$http', function($scope, $http) {
	$http({method: 'GET', url: '/get/servers/status'})
		.success(function(data, status, headers, config) {
			$scope.servers = data;
			console.log(data);
		});
}]);