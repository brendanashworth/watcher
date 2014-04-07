assert = require('chai').assert
lib = require '../dist/config'

# Testing /src/config.coffee - the configuration module.
describe '/src/config.coffee', ->
	# retrieve server type - #getServerType()
	describe '#getServerType()', ->
		it 'should return a string regardless', ->
			value = lib.getServerType()
			assert.isString value, 'server type must be string'
	# get servers - #getServers()
	describe '#getServers()', ->
		it 'should return an object regardless', ->
			value = lib.getServers()
			assert.isObject value, 'servers must be an object'
	# get daemon settings - #getDaemonSettings()
	describe '#getDaemonSettings()', ->
		it 'should return an object regardless', ->
			value = lib.getDaemonSettings()
			assert.isObject value, 'daemon settings must be an object'
	# get frontend settings - #getFrontendSettings()
	describe '#getFrontendSettings()', ->
		it 'should return an object regardless', ->
			value = lib.getFrontendSettings()
			assert.isObject value, 'frontend settings must be an object'