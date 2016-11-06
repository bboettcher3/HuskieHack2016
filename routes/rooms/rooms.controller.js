(function() {
    'use strict';

    var Rooms = require('./rooms.model');


//Basic CRUD
    
    //grab all for display
    module.exports.getAll = function(req, res) { 
        
        Rooms.find({}, function (err, post) {
            console.log(post);
            console.log("before");
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
        
        console.log("after");
    };
    
    //gets all the rooms teh user is in
    module.exports.getByUser = function(req, res) { 
        Rooms.find({people : req.params.user }, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
    };

    
    
})();