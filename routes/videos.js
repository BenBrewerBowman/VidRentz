// GET THE ROUTER
// import express and get router obj
var express = require('express');
var router = express.Router();

// import monk. Returns method that we call to access our DB
var monk = require('monk');
// call monk method to access db
var db = monk('localhost:27017/vidzy');

// REGISTER SOME ROUTES ON IT
router.get('/', function(req, res) {
  var collection = db.get('videos');
  // filtering criteria, error first callback
  collection.find({}, function(err, videos) {
    // err is null if there are no errors retrieving video docs
    if (err) throw err;
    // if no errors, return JSON obj
    res.json(videos);
  });
});

router.post('/', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

// RETURN ROUTER OBJ WITH SOME ROUTES ON IT
module.exports = router;
