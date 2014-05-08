# retrieve.js, stats the server
fs    = require 'fs'
os    = require 'os'
async = require 'async'
exec  = require('child_process').exec

module.exports =
	stat: (callback) ->
		serverData = {}

		# async.parallel runs all our statistic generating stuff asynchronously, not waiting for eachother. it calls back our function at the end.
		async.parallel {
				load_average: (callback) ->
					callback null, os.loadavg()

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
					callback null, os.hostname()

				disk_usage: (callback) ->
					exec 'df -h | awk \'{if (NR!=1) {print $1" "$2" "$3" "$4" "$5" "$6}}\'', (err, stdout, stderr) ->
						if err
							console.log "Error running \'df\': #{err}"
							callback null, 'disk_usage'

						callback null, stdout

				system: (callback) ->
					callback null, os.type()

				cpu_arch: (callback) ->
					callback null, os.arch()

				interfaces: (callback) ->
					callback null, os.networkInterfaces()

				cpus: (callback) ->
					callback null, os.cpus()
			}, (err, results) ->
				# load average
				serverData.load_average.one_min = results['load_average'][0]
				serverData.load_average.five_min = results['load_average'][1]
				serverData.load_average.fifteen_min = results['load_average'][2]

				# numcpu
				serverData.num_cpu = results['cpus'].length

				# disk usage
				diskusage = results['disk_usage']
				lines = diskusage.match /[^\r\n]+/g

				for line in lines
					serverData.disk_usage[lines.indexOf(line)] =
						'system': line.split(' ')[0]
						'total': line.split(' ')[1]
						'used': line.split(' ')[2]
						'free': line.split(' ')[3]
						'percent': line.split(' ')[4]
						'mount': line.split(' ')[5]

				# uptime
				serverData.node_uptime = Math.round(results['uptime'])

				# different info
				serverData.cpu_arch = results['cpu_arch']
				serverData.system = results['system']

				# network interfaces
				serverData.interfaces = results['interfaces']

				# hostname
				serverData.node_hostname = results['hostname']

				# mem usage
				memusage = results['mem_usage']
				lines = memusage.match /[^\r\n]+/g
				serverData.mem_usage.total = lines[0] * 1024
				serverData.mem_usage.free = lines[1] * 1024 # multiply by 1024 to transfer kb -> bytes

				callback serverData

		return