// storecpu.js is a caching sort of thing for storing the cpu
var past = {
	'1': '0.01',
};

module.exports = {
	addCPU: function(cpu) {
		var date = new Date().getTime(),
			cpu = parseFloat(cpu),
			canlog = true;

		for(var key in past) {
			if(key === 'length' || !past.hasOwnProperty(key)) continue;

			if(date < past[key] + 4500) {
				canlog = false;
			}
		}

		if(canlog) {
			past[date] = cpu;
		}
	}
};