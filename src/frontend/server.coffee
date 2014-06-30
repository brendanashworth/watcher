# frontend server.js
staticize = require 'staticize'
express = require 'express'
auth = require 'http-auth'
config = require '../config'
logger = require '../logging/index'

# Initiate application.
app = express()

authSettings = auth.basic
	realm: "watcher.js username / password combination (app.yml)"
	file: __dirname + "/../../users.htpasswd"

if config.getFrontendSettings().auth
	logger.info "Authentication is turned on for the frontend"
	app.use auth.connect(authSettings)

# Setup ExpressJS's routes.
staticize app,
	'/': './dist/static/index.html'

app.get '/get/servers', require('./controllers/servers')
app.get '/get/servers/status', require('./controllers/overview')
app.get '/get/servers/:id', require('./controllers/retrieve')

app.get /^\/asset\/(.)+$/, require('./controllers/asset')

# Set ExpressJS to listen.
server = app.listen config.getFrontendSettings().port

logger.success "Frontend booted successfully. (*:#{config.getFrontendSettings().port})"

module.exports =
	close: ->
		if server?
			server.close()
			server = undefined
			return yes
		else
			return no