// import express into module
var express = require('express');
// Access router obj in express.
// Router defines endpoints for app, where requests are received.
// Each endpoint has a route handler, which handles endpoint requests.
var router = express.Router();

/* GET home page. */
// '/' is the root of site (home page). Function is the route handler.
// Route handler params: request obj, response, next handler in chain.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
