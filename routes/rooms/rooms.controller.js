(function() {
    'use strict';

    var Rooms = require('./rooms.model');


//Basic CRUD
    
    //grab all for display
    module.exports.getAll = function(req, res) { 
        Rooms.find({}, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
    };
 

    
    
})();