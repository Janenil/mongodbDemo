var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('127.0.0.1:27017/test');

/* GET userlist page. */
router.get('/', function (req, res, next) {
    var collection = db.get('test');
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {"userlist": docs});
    });
});

module.exports = router;
