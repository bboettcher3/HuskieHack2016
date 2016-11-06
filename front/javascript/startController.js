app.controller('StartController', function($scope, $http, $rootScope, $location) {

//    var socket = io.connect();

    $scope.pickUser = function(user) {
        $scope.pickedUser = user;
        console.log(user);
        $http.get("/api/rooms/byUser/"+user.username).success(function(data){
            console.log(data);
            $scope.rooms = data; //data == array 
            parseRoomName(data, $scope.pickedUser.username);
            
            
        });
    }
    
    
    function parseRoomName(room, username) {
        /*console.log(room[0].people);        
        console.log(username);*/
        
        for(i = 0; i < room.length; i++) { 
            var check = room[i].people;
            if(check !== username) {
                room[i].roommates += check + " ";
            }
            }
        }   
    
        
    var init = function (scope) {
        $http.get("/api/users").success(function(data){
            console.log(data);
        
            $scope.users = data;
        });
    };
    
   $scope.scopeTest = "ScopeTest"    
  
    //$scope.pickedUser.username == petr
init();
});