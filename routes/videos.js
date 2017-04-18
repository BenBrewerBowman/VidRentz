// GET THE ROUTER
// import express and get router obj
var express = require('express');
var router = express.Router();

// import monk. Returns method that we call to access our DB
var monk = require('monk');
// call monk method to access db
var db = monk('localhost:27017/vidzy');

// REGISTER SOME ROUTES ON IT
// RETRIEVE VIDEO
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

// NEW ARTICLE
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

// EDIT VIDEO
// return obj of video to edit
router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;
      	res.json(video);
    });
});
// update the video with edit changes
router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

// RETURN ROUTER OBJ WITH SOME ROUTES ON IT
module.exports = router;
