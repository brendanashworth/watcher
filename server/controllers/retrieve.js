// retrieve.js is a controller
var fs    = require("fs");
var async = require("async");
var exec  = require("child_process").exec;
var store = require('../storage/storecpu');

module.exports = {
	// run the controller
	run: function(request, response) {
		// write header
		response.writeHeader(200, {'Content-Type': 'application/json'});

		var serverData = {
			'load_average': {
				'one_min': '',
				'five_min': '',
				'fifteen_min': ''
			},
			'num_cpu': '',
			'node_uptime': '',
			'disk_usage': {

			},
			'mem_usage': {
				'total': '',
				'free': '',
			}
		};

		// async.parallel runs all our statistic generating stuff asynchronously, not waiting for eachother. it calls back our function at the end.
		async.parallel({
			// get the CPU load average.
			load_average: function(callback) {
				fs.readFile('/proc/loadavg', {encoding: 'utf8'}, function(err, data) {
					// if there was an error
					if(err) {
						console.log('Error loading /proc/loadavg: '+err);
						callback(null, 'load_average');
						return;
					}

					// call the callback with our data
					callback(null, data);
					store.addCPU(data.split(' ')[0]);
				});
			},
			// get the number of cpu cores
			cpu_cores: function(callback) {
				exec('nproc', function(error, stdout, stderr) {
					if(error) {
						console.log('Error running \'nproc\': '+error);
						callback(null, 'num_cpu');
						return;
					}

					callback(null, stdout);
				});
			},
			// get the ram usage
			mem_usage: function(callback) {
				exec('cat /proc/meminfo | grep \'Mem\' | awk \'{print $2}\'', function(error, stdout, stderr) {
					if(error) {
						console.log('Error running \'cat /proc/meminfo\': '+error);
						callback(null, 'mem_usage');
						return;
					}

					callback(null, stdout);
				});
			},
			// get the node uptime
			uptime: function(callback) {
				exec('cat /proc/uptime | awk \'{print $1}\'', function(error, stdout, stderr) {
					if(error) {
						console.log('Error running \'cat /proc/uptime\': '+error);
						callback(null, 'mem_usage');
						return;
					}

					callback(null, stdout);
				});
			},
			// get the disk partitions and use
			disk_usage: function(callback) {
				exec('df | awk \'{if (NR!=1) {print $1" "$3" "$4" "$5}}\'', function(error, stdout, stderr) {
					if(error) {
						console.log('Error running \'df\': '+error);
						callback(null, 'disk_usage');
					}

					callback(null, stdout);
				});
			}},

			function(err, results) {
				// load average
				var loadavg = results['load_average'].split(' ');
				serverData.load_average.one_min = loadavg[0];
				serverData.load_average.five_min = loadavg[1];
				serverData.load_average.fifteen_min = loadavg[2];

				// numcpu
				var numcpu = results['num_cpu'];
				if(numcpu > 1) {
					serverData.num_cpu = numcpu + ' cores';
				} else {
					serverData.num_cpu = '1 core';
				}

				// disk usage
				var diskusage = results['disk_usage'];
				var lines = diskusage.match(/[^\r\n]+/g);
				for(var i = 0; i < lines.length; i++) {
					serverData.disk_usage[i] = {
						'system': lines[i].split(' ')[0],
						'used': lines[i].split(' ')[1],
						'available': lines[i].split(' ')[2],
						'percent': lines[i].split(' ')[3]
					};
				}

				// uptime
				var uptime = results['uptime'];
				serverData.node_uptime = Math.round(uptime);

				// mem usage
				var memusage = results['mem_usage'];
				lines = memusage.match(/[^\r\n]+/g);
				serverData.mem_usage.total = lines[0] * 1024;
				serverData.mem_usage.free = lines[1] * 1024; // multiply by 1024 to transfer kb -> bytes

				var json = JSON.stringify(serverData);
				response.write(json);

				response.end();
			});
	}
};