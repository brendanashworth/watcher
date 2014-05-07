# frontend server.js
config = require '../config'
express = require 'express'

# Initiate application.
app = express()

# Setup ExpressJS's routes.
app.get '/', require('./controllers/index')

app.get '/get/servers', require('./controllers/servers')
app.get '/get/servers/status', require('./controllers/overview')
app.get /^\/get\/server\/(.)+$/, require('./controllers/retrieve')

app.get /^\/asset\/(.)+$/, require('./controllers/asset')

# Set ExpressJS to listen.
app.listen config.getFrontendSettings().port