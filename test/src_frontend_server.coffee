assert = require('chai').assert
should = require('chai').should
expect = require('chai').expect
logger = require '../dist/logging/index'
config = require '../dist/config'
http = require 'http'

# init
variables = {}

# Testing /src/frontend/server, used for running the frontend server
describe 'src/frontend/server.coffee', ->
	# Automatically called when the server is require'd
	describe '#_init', ->
		before ->
			# logging
			logger.setTesting yes

			# server
			variables.lib = require '../dist/frontend/server'
			variables.daemon = require '../dist/daemon/server' # booting just for testing /get/servers/:id

		it 'should return 200 OK for /', (done) ->
			http.get 'http://localhost:8080/', (res) ->
				assert.equal res.statusCode, 200
				done()
		it 'should return 200 OK for /get/servers', (done) ->
			http.get 'http://localhost:8080/get/servers', (res) ->
				assert.equal res.statusCode, 200
				done()
		it 'should return 200 OK for /get/servers/status', (done) ->
			this.timeout(6000) # it can take a while
			http.get 'http://localhost:8080/get/servers/status', (res) ->
				assert.equal res.statusCode, 200
				done()
		it 'should return 200 OK for /get/servers/:id (id:1)', (done) ->
			http.get 'http://localhost:8080/get/servers/1', (res) ->
				assert.equal res.statusCode, 200
				done()

		after ->
			variables.lib.close()
			variables.daemon.close()
