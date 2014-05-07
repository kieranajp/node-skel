var config  = require("./config")
  , http    = require("http")
  , proxy   = require("http-proxy")
  , express = require("express")
  , hbs     = require("hbs")
  , less    = require("less-middleware")
  , app     = express()
  , px      = proxy.createProxyServer({})
  ;


// Set up config for the LESS pre-processor
app.use(less(
  __dirname + "/../public",
  {
    debug : config.debug,
    force : config.debug,
    // once  : !config.debug // Only compile on each server restart
  }
));


// Other config for the Express app
app.set("views", __dirname + "/../templates");
app.set("view engine", hbs);
app.use(express.static(__dirname + "/../public"));


// List all the routing files here so that they all get required
// For clarity, the folder structure of the ./routes folder should kinda match
// the URL structure of the site.
[
  "./routes/test"
].forEach(function(route) {
  require(route)(app);
});


app.use(function(req, res, next) {
  console.log('Forwarding unknown request path %s.', req.url);
  px.web(req, res, { target: 'http://127.0.0.1:8080' }, function() {
    res.end();
  });
});


// And start the server!
app.listen(config.express.port, config.express.ip, function(err) {
  if (err) {
    console.error("Unable to listen for connections", err);
    process.exit(10);
  }

  console.info(
    "express is listening on http://" +
    config.express.ip + ":" + config.express.port
  );
})
