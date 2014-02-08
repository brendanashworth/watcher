// retrieve.js is a controller
var fs    = require("fs");
var async = require("async");
var exec  = require("child_process").exec;

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
			'disk_usage': {

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
				});
			},
			// get the number of cpu cores
			cpu_cores: function(callback) {
				exec('nproc', function(error, stdout, stderr) {
					if(error) {
						console.log('Error running \'nproc\': '+error);
						callback(null, 'num_cpu');
					}

					callback(null, stdout);
				});
			},
			disk_usage: function(callback) {
				exec('du -sh /home/* | awk \'{print $1" "$2}\'', function(error, stdout, sterr) {
					if(error) {
						console.log('Error running \'du\': '+error);
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
						'size': lines[i].split(' ')[0],
						'dir': lines[i].split(' ')[1]
					};

				}

				var json = JSON.stringify(serverData);
				response.write(json);

				response.end();
			});
	}
};