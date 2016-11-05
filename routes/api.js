
(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

//  router.use('/login', require('./login'));  
//  router.use('/count', require('./count'));    
  router.use('/rooms', require('./rooms'));    
  router.use('/users', require('./users'));    

  module.exports = router;

})();


