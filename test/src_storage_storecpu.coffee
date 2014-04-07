assert = require('chai').assert
lib = require '../src/storage/storecpu'

# Testing /src/storage/storecpu.coffee - used for storing CPU data
describe '/src/storage/storecpu.coffee', ->
	# stat CPU - #statCPU()
	describe '#statCPU()', ->
		it 'will not throw an error regardless', ->
			assert.doesNotThrow lib.statCPU, Error, 'should not throw error'
	# add CPU data - #addCPU(data)
	describe '#addCPU()', ->
		it 'will not throw an error if paramaters exist', ->
			assert.doesNotThrow ->
				lib.addCPU(123)
			, Error, 'does not throw error'

		it 'will throw an error if paramaters empty', ->
			assert.throws ->
				lib.addCPU()
			, Error, 'CPU paramater is necessary'