assert = require('chai').assert
lib = require '../dist/stat/retrieve'

# Testing /src/stat/retrieve.coffee - used for getting data on the server
describe 'src/stat/retrieve.coffee', ->
	# The actual #stat(callback) method
	describe '#stat(callback)', ->
		it 'should not return a null value if successful', ->
			lib.stat (data) ->
				assert.isNotNull data, 'should not be null'
		it 'should return an object if successful', ->
			lib.stat (data) ->
				assert.isObject data, 'should be an object'