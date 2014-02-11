// storecpu.js is a caching sort of thing for storing the cpu
var fs = require("fs");

var past = {
	// '1': '0.01', - example
};

function addCPU(cpu) {
	var date = new Date().getTime(),
		cpu = parseFloat(cpu),
		canlog = true;

	for(var key in past) {
		if(key === 'length' || !past.hasOwnProperty(key)) continue;

		if(date < past[key] + 300000) {
			canlog = false;
		}
	}

	if(canlog) {
		past[date] = cpu;
	}
}

function statCPU() {
	console.log('Statting CPU...');
	// read file
	fs.readFile('/proc/loadavg', {encoding: 'utf8'}, function(err, data) {
		// if there was an error
		if(err) {
			console.log('Error loading /proc/loadavg: '+err);
			return;
		}

		addCPU(data.split(' ')[0]);
	});
}

module.exports = {
	addCPU: function(cpu) {
		addCPU(cpu);
	},

	statCPU: function() {
		statCPU();
	},
	getData: function() {
		return past;
	}
};