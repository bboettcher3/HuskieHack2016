(function() {
    'use strict';

     //auth login and return token
     module.exports.auth = function(req, res) {
         
         var email = req.body.email;
         var password = req.body.password;
         
         if (email === "test@test.com") {
         
             if (password == "usePassPort") {    
                 
                res.send("good");
                 
             } else {                 
                 return res.status(500).send("invalid password");                 
             }
             
         } else {             
            return res.status(500).send("invalid email " + req.body);
         }
                     
     }; 
   
    
})();