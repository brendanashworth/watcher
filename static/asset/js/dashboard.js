var data = {};
var server = '1';

function drawCircles(serverId) {
	// Free ram circle
	Circles.create({
		id:         'js-'+serverId+'-free-ram',
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
		id:         'js-'+serverId+'-used-ram',
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
		id:         'js-'+serverId+'-cpu',
		percentage: parseInt(data.load_average.one_min),
		radius:     100,
		width:      10,
		number:     parseInt(data.load_average.one_min),
		text:       '%',
		colors:     ['#00665E', '#009D91'],
		duration:   100
	});
}

function refreshData(id, callback) {
	$.ajax({
		url: '/get/server/' + id,
		type: 'GET',
		success: function(newData) {
			data = newData;

			data.mem_usage.used = parseInt(data.mem_usage.total - data.mem_usage.free);

			data.mem_usage.percent_total = '100',
			data.mem_usage.percent_free = Math.round((data.mem_usage.free / data.mem_usage.total) * 100),
			data.mem_usage.percent_used = Math.round((data.mem_usage.used / data.mem_usage.total) * 100);

			console.log('polled');
			callback();
			// load average
			//$("#cpu-1").text(data.load_average.one_min);
			//$("#cpu-2").text(data.load_average.five_min);
			//$("#cpu-3").text(data.load_average.fifteen_min);
			// num cpu
			//$("#cpu-cores").text(data.num_cpu);
			// hostname
			//$("#node-hostname").text(data.node_hostname);
			// ram usage
			//var memtotal = parseInt(data.mem_usage.total), memfree = parseInt(data.mem_usage.free), memused = memtotal - memfree;
			//var perfree = Math.round((memfree / memtotal) * 100), perused = Math.round((memused / memtotal) * 100);
			//$("#ram-total").html(getAmount(memtotal));
			//$("#ram-free").html(getAmount(memfree)+' ('+perfree+'%)');
			//$("#ram-used").html(getAmount(memused)+' ('+perused+'%)');

			// disk usage
			/*$("#disk-usage-table > tbody").empty();
			for(var i in data.disk_usage) {
				var system = data.disk_usage[i].system;
				var used = data.disk_usage[i].used;
				var available  = data.disk_usage[i].available;
				var percent = data.disk_usage[i].percent;
				$("#disk-usage-table > tbody").append('<tr><td>'+system+'</td><td>'+getAmount(used)+'</td><td>'+getAmount(available)+' ('+percent+')</td></tr>');
			}

			// uptime
			$("#node-uptime").text(getAmountInTime(data.node_uptime));*/

			// the graph
			//cpuData = data.pastCPU;
			//initCPUHistoryChart();
		},
		error: function(xhr, status, error) {
			alert('Error refreshing'); //addAlert('Error refreshing', 'Could not refresh statistics. Will reattempt a connection.');
		}
	});
}

$(document).ready(function() {
	setInterval(
		function() {
			refreshData(server, function() {
				drawCircles(server);
			});
		}, 5000);

	// scrollspy
	$('body').scrollspy({
		target: '.sidebar'
	});
});

/*
$(document).ready(function() {
	var cpuData = {};
	var chartOptions = {
		pointDot: false,
		animation: false
	};
	function initCPUHistoryChart() {
		// parse through data
		var data = cpuData;
		var time = new Date().getTime();

		var keys = [],
			values = [];

		for (var property in data) {
			if (!data.hasOwnProperty(property)) {
				continue;
			}

			// is it older than 15 minutes
			if(property < time - 900000) {
				continue;
			}

			keys.push(' ');
			values.push(data[property]);
		}

		$.getJSON("/asset/json/graph.json", function(graph) {
			graph.datasets[0].data = values;
			graph.labels = keys;

			var ctx = $("#cpu-history").get(0).getContext("2d");
			var chart = new Chart(ctx).Line(graph, chartOptions);
		});
	}

	function parseCPUData() {
		var data = [];
		for(var i = 0; i < cpuData.length; i++) {
			data[i] = cpuData[i];
		}

		cpuData = data;
	}

	function getAmount(data) {
		data = parseInt(data);

		// go through
		if(data > 1024 * 10) {
			if(data / 1024 > 1024 * 10) {
				if(data / Math.pow(1024, 2) > 1024 * 10) {
					return Math.round(data / Math.pow(1024, 3)) + '<span class="data-calm">GB</span>';
				} else {
					return Math.round(data / Math.pow(1024, 2)) + '<span class="data-calm">MB</span>';
				}
			} else {
				return Math.round(data / 1024) + '<span class="data-calm">KB</span>';
			}
		} else {
			return data + ' <span class="data-calm">bytes</span>';
		}
	}

	function getAmountInTime(data) {
		data = parseInt(data);

		if(data > 60) {
			if(data / 60 > 60) {
				if(data / Math.pow(60, 2) > 60) {
					return Math.round(data / (Math.pow(60, 2) * 24)) + ' days';
				} else {
					return Math.round(data / Math.pow(60, 2)) + ' hours';
				}
			} else {
				return Math.round(data / 60) + ' minutes';
			}
		} else {
			return data + ' seconds';
		}
	}

	function addAlert(title, alert) {
		$(".alert")
			.html('<b>'+title+':</b> '+alert)
			.show();
	}

	function hideAlert() {
		$(".alert")
			.hide();
	}

	function refreshData() {
		console.log('watcher.js - refreshing data');

		// perform ajax
		$.ajax({
			url: '/get/server/1',
			type: 'GET',
			success: function(data) {
				hideAlert();
				data = JSON.parse(data);
				// load average
				$("#cpu-1").text(data.load_average.one_min);
				$("#cpu-2").text(data.load_average.five_min);
				$("#cpu-3").text(data.load_average.fifteen_min);
				// num cpu
				$("#cpu-cores").text(data.num_cpu);
				// hostname
				$("#node-hostname").text(data.node_hostname);
				// ram usage
				var memtotal = parseInt(data.mem_usage.total), memfree = parseInt(data.mem_usage.free), memused = memtotal - memfree;
				var perfree = Math.round((memfree / memtotal) * 100), perused = Math.round((memused / memtotal) * 100);
				$("#ram-total").html(getAmount(memtotal));
				$("#ram-free").html(getAmount(memfree)+' ('+perfree+'%)');
				$("#ram-used").html(getAmount(memused)+' ('+perused+'%)');

				// disk usage
				$("#disk-usage-table > tbody").empty();
				for(var i in data.disk_usage) {
					var system = data.disk_usage[i].system;
					var used = data.disk_usage[i].used;
					var available  = data.disk_usage[i].available;
					var percent = data.disk_usage[i].percent;
					$("#disk-usage-table > tbody").append('<tr><td>'+system+'</td><td>'+getAmount(used)+'</td><td>'+getAmount(available)+' ('+percent+')</td></tr>');
				}

				// uptime
				$("#node-uptime").text(getAmountInTime(data.node_uptime));

				// the graph
				cpuData = data.pastCPU;
				initCPUHistoryChart();
			},
			error: function(xhr, status, error) {
				addAlert('Error refreshing', 'Could not refresh statistics. Will reattempt a connection.');
			}
		});
	}

	setInterval(refreshData, 5000);
	refreshData();
});*/