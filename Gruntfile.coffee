module.exports = (grunt) ->

	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		# Clean out the attic
		clean:
			dist: ['dist']
			statics: ['dist/static']
		# Compile all src/**/*.coffee files to dist/ .js files
		coffee:
			compile:
				expand: true
				cwd: 'src/'
				src: ['**/*.coffee']
				dest: 'dist'
				ext: '.js'
		# Compile our .less file
		less:
			default:
				options:
					cleancss: true
				files:
					'dist/static/asset/css/dashboard.css': ['static/asset/css/dashboard.less']
		# Copy over statics
		copy:
			statics:
				expand: true
				cwd: 'static/'
				src: '**/*.{html,js,png}'
				dest: 'dist/static'

	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-less'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-coffee'

	grunt.registerTask 'default', ['clean:dist', 'coffee:compile', 'less', 'copy:statics']