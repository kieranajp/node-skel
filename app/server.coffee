config = require './config'
express = require 'express'
stylus = require 'stylus'
nib = require 'nib'

compile = (str, path) ->
  return stylus(str).set('filename', path).use nib()

app = express()

app.set 'views', "#{__dirname}/../templates"
app.set 'view engine', 'jade'
app.use stylus.middleware
  src : "#{__dirname}/../public"
  compile : compile

app.use(express.static "#{__dirname}/../public")

[
  './routes/test'
].forEach (route) ->
  require(route)(app)

app.use app.router

app.listen config.express.port, config.express.ip, (err) ->
  if err
    console.error 'Unable to listen for connections', err
    process.exit 10

  console.info 'express is listening on http://' + \
  config.express.ip + ':' + config.express.port
