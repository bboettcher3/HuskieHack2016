(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var RoomsSchema = new Schema({
        people : [],
        chats: [],
        pictures: [],
        files: [],
        links: []
    });

module.exports = mongoose.model('Rooms', RoomsSchema);

})();