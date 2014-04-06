# storecpu is a caching sort of thing for storing the cpu
fs = require 'fs'

past = {}
	# '1': '0.01', - example

addCPU = (cpu) ->
	date   = new Date().getTime()
	cpu    = parseFloat(cpu)
	canlog = true

	for key, value of past
		if key is 'length' or !past.hasOwnProperty key
			continue

		if date < past[key] + 300000
			canlog = false

	if canlog
		past[date] = cpu

statCPU = ->
	console.log 'Statting CPU...'
	# read file
	fs.readFile '/proc/loadavg', {encoding: 'utf8'}, (err, data) ->
		# if there was an error
		if err
			console.log "Error loading /proc/loadavg: #{err}"
			return

		addCPU data.split(' ')[0]

module.exports =
	addCPU: (cpu) ->
		addCPU cpu

	statCPU: ->
		statCPU()

	getData: ->
		return past