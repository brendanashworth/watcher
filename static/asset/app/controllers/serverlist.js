// ServerList controller
app.controller('ServerListController', ['$scope', '$http', function($scope, $http) {
	$http({method: 'GET', url: '/get/servers'})
		.success(function(data, status, headers, config) {
			$scope.servers = data;
		});
}]);