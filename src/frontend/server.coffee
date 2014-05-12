# frontend server.js
config = require '../config'
express = require 'express'
auth = require 'http-auth'

# Initiate application.
app = express()

authSettings = auth.basic
	realm: "watcher.js username / password combination (app.yml)"
	file: __dirname + "/../../users.htpasswd"

if config.getFrontendSettings().auth
	console.log "Authentication is turned on for the frontend"
	app.use auth.connect(authSettings)

# Setup ExpressJS's routes.
app.get '/', require('./controllers/index')

app.get '/get/servers', require('./controllers/servers')
app.get '/get/servers/status', require('./controllers/overview')
app.get '/get/servers/:id', require('./controllers/retrieve')

app.get /^\/asset\/(.)+$/, require('./controllers/asset')

# Set ExpressJS to listen.
app.listen config.getFrontendSettings().port