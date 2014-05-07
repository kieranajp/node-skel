var test = function(req, res) {
  res.send("Hello, world");
};

var testWithParam = function(req, res) {
  var p = req.params.bob;
  res.send("Hello, " + p);
};

var testRender = function(req, res) {
  res.render('test/test.hbs')
};

module.exports = function(app) {
  app.get("/test", test);
  app.get("/test/render", testRender);
  app.get("/test/:bob", testWithParam);
};
