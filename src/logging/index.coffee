# logging file
chalk = require 'chalk'

# gets us the short time, 'month/day/year hour:minute:second'
shortTime = ->
	date = new Date()
	return "#{date.getMonth()}/#{date.getDate()}/#{date.getFullYear()} #{date.getHours()}:#{date.getMinutes()}:#{date.getSeconds()}"

# logs a message to the console
raw = (message) ->
	console.log message

module.exports =
	error: (message) ->
		raw "[#{shortTime()}] " + chalk.red(message)

	success: (message) ->
		raw "[#{shortTime()}] " + chalk.green(message)

	info: (message) ->
		raw "[#{shortTime()}] " + message

	raw: (message) ->
		raw message