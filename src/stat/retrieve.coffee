# retrieve.js, stats the server
fs    = require 'fs'
async = require 'async'
exec  = require('child_process').exec
store = require '../storage/storecpu'

module.exports =
	stat: (callback) ->
		serverData =
			'load_average':
				'one_min': ''
				'five_min': ''
				'fifteen_min': ''
			'num_cpu': ''
			'node_hostname': ''
			'node_uptime': ''
			'disk_usage': {}
			'mem_usage':
				'total': ''
				'free': ''

		# async.parallel runs all our statistic generating stuff asynchronously, not waiting for eachother. it calls back our function at the end.
		async.parallel {
				load_average: (callback) ->
					fs.readFile '/proc/loadavg', {encoding: 'utf8'}, (err, data) ->
						# if there was an error
						if err
							console.log "Error loading /proc/loadavg: #{err}"
							callback null, 'load_average'
							return

						callback null, data
						store.addCPU data.split(' ')[0]

				cpu_cores: (callback) ->
					exec 'nproc', (err, stdout, stderr) ->
						if err
							console.log "Error running 'nproc': #{err}"
							callback null, 'num_cpu'
							return;

						callback null, stdout

				mem_usage: (callback) ->
					exec 'cat /proc/meminfo | grep \'Mem\' | awk \'{print $2}\'', (err, stdout, stderr) ->
						if err
							console.log "Error running \'cat /proc/meminfo\': #{err}"
							callback null, 'mem_usage'
							return

						callback null, stdout

				uptime: (callback) ->
					exec 'cat /proc/uptime | awk \'{print $1}\'', (err, stdout, stderr) ->
						if err
							console.log "Error running \'cat /proc/uptime\': #{err}"
							callback null, 'mem_usage'
							return

						callback null, stdout

				hostname: (callback) ->
					fs.readFile '/etc/hostname', {encoding: 'utf8'}, (err, data) ->
						if err
							console.log "Error loading /etc/hostname: #{err}"
							callback null, 'hostname'
							return

						callback null, data

				disk_usage: (callback) ->
					exec 'df | awk \'{if (NR!=1) {print $1" "$3" "$4" "$5}}\'', (err, stdout, stderr) ->
						if err
							console.log "Error running \'df\': #{err}"
							callback null, 'disk_usage'

						callback null, stdout
			}, (err, results) ->
				# load average
				loadavg = results['load_average'].split(' ')
				serverData.load_average.one_min = loadavg[0]
				serverData.load_average.five_min = loadavg[1]
				serverData.load_average.fifteen_min = loadavg[2]

				# numcpu
				numcpu = results['num_cpu'];
				serverData.num_cpu = numcpu + ' core'
				if numcpu > 1
					serverData.num_cpu = serverData.num_cpu + 's'

				# disk usage
				diskusage = results['disk_usage']
				lines = diskusage.match /[^\r\n]+/g

				for line in lines
					serverData.disk_usage[lines.indexOf(line)] =
						'system': line.split(' ')[0]
						'used': line.split(' ')[1]
						'available': line.split(' ')[2]
						'percent': line.split(' ')[3]

				# uptime
				uptime = results['uptime']
				serverData.node_uptime = Math.round(uptime)

				# hostname
				hostname = results['hostname']
				serverData.node_hostname = hostname

				# mem usage
				memusage = results['mem_usage']
				lines = memusage.match /[^\r\n]+/g
				serverData.mem_usage.total = lines[0] * 1024
				serverData.mem_usage.free = lines[1] * 1024 # multiply by 1024 to transfer kb -> bytes

				callback serverData

		return