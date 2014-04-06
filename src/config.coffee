# config
fs   = require 'fs'
yaml = require 'js-yaml'

# get the parsed configuration file
getConfigContents = ->
	contents = fs.readFileSync "./app.yml", {encoding: 'utf8'}
	return yaml.safeLoad contents

module.exports =
	getServerType: ->
		file = getConfigContents()
		return file.settings.server_type

	getServers: ->
		file = getConfigContents()
		return file.servers

	getDaemonSettings: ->
		file = getConfigContents()
		return file.settings.daemon

	getFrontendSettings: ->
		file = getConfigContents()
		return file.settings.frontend