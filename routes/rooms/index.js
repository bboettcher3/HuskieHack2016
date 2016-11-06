(function() {
  'use strict';

  var express = require('express');
  var controller = require('./rooms.controller')    
    
  var router = express.Router();

  router.get('/', controller.getAll);
  router.get('/byUser/:user', controller.getByUser);
  router.post('/updateChat', controller.updateChat);
//  router.post('/:id/:count', controller.update);
//  router.delete('/:id', controller.delete);
  

  module.exports = router;

})();