test = (req, res) ->
  res.render 'test/test.jade'

testWithParam = (req, res) ->
  p = req.params.bob
  res.send 'hello, ' + p

setup = (app) ->
  app.get '/test', test
  app.get '/test/:bob', testWithParam

module.exports = setup
