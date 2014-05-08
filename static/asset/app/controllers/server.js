app.controller('ServerController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
	$http({method: 'GET', url: '/get/server/' + $routeParams.id})
		.success(function(data, status, headers, config) {
			$scope.disks = data.disk_usage;
			$scope.hostname = data.node_hostname;
			$scope.cores = data.num_cpu > 1 ? data.num_cpu + " cores" : data.num_cpu + " core";
			$scope.ram = getAmount(data.mem_usage.total);
			$scope.cpu_load = round(data.load_average.one_min * 100);
			$scope.cpu_arch = data.cpu_arch;
			$scope.platform = data.system;
			$scope.interfaces = data.interfaces;
			$scope.cpus = data.cpus;

			data.mem_usage.used = parseInt(data.mem_usage.total - data.mem_usage.free);

			data.mem_usage.percent_total = '100',
			data.mem_usage.percent_free = Math.round((data.mem_usage.free / data.mem_usage.total) * 100),
			data.mem_usage.percent_used = Math.round((data.mem_usage.used / data.mem_usage.total) * 100);

		    $scope.ramData = [
		        {value: data.mem_usage.percent_free, color: '#A40004'},
		        {value: data.mem_usage.percent_used, color: '#AAA'}
		    ];

			$scope.cpuData = {
				labels: ["1 min", "5 min", "15 min"],
				datasets: [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,1)",
					data: [data.load_average.one_min, data.load_average.five_min, data.load_average.fifteen_min]
				}
				]
			};

		    $scope.chartOptions = {
		        segementStrokeWidth: 20,
		        segmentStrokeColor: '#000'
		    };

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
}]);