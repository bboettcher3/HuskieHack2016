(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        username : String,
        friends : []
    });

module.exports = mongoose.model('Users', UserSchema);

})();