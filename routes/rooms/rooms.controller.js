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
    
    //update chat array
    //Params:
        // _id
            // id of document
        // chat 
            // new object of chat that gets pushed
     module.exports.updateChat = function(req, res) {
        var id = req.body._id;
        var newChat = req.body.chat;         
        
        // Need to do this so mongo doesn't think we're trying to edit the _id
  
        Rooms.findByIdAndUpdate(id, 
          {$push: {"chats": newChat}},
          {safe: true, upsert: true},
          function(err, post) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }  
          res.json(post);
        });
     };
 

    
    
})();