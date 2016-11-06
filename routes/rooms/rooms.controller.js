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
 
    module.exports.updateFiles = function(req, res) {
        var id = req.body._id;
        var newFile = req.body.file;         
        
        // Need to do this so mongo doesn't think we're trying to edit the _id
  
        Rooms.findByIdAndUpdate(id, 
          {$push: {"files": newFile}},
          {safe: true, upsert: true},
          function(err, post) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }  
          res.json(post);
        });
     };
    
    // _id
        // id of document
    // chats[]
        // new object of chat that gets pushed
     module.exports.updateTextPin = function(req, res) {
        var id = req.body._id;
        var chats = req.body.chats;      
        
        // Need to do this so mongo doesn't think we're trying to edit the _id  
        Rooms.findOneAndUpdate({_id : id}, 
          {$set: {"chats": chats}},
          function(err, post) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }  
          res.json(post);
        });
     };
        
    
})();