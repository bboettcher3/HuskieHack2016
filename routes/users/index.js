(function() {
  'use strict';

  var express = require('express');
  var controller = require('./users.controller')    
    
  var router = express.Router();

  router.get('/', controller.getAll);
//  router.post('/start', controller.start);
//  router.post('/:id/:count', controller.update);
//  router.delete('/:id', controller.delete);
  

  module.exports = router;

})();