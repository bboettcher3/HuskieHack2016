(function() {
    'use strict';

    var Users = require('./users.model');


//Basic CRUD
    
    //grab all for display
    module.exports.getAll = function(req, res) { 
        Users.find({}, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
    };
 

    
    
})();