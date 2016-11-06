app.controller('StartController', function($scope, $http, $rootScope, $location, USER) {
    
    $scope.pickUser = function(user) {
        $scope.pickedUser = user;        
        USER.username = $scope.pickedUser.username;

        $http.get("/api/rooms/byUser/"+user.username).success(function(data){
            $scope.rooms = data; //data == array or rooms
            parseRoomName(data, $scope.pickedUser.username);            
            
        });
    }
    
    $scope.pickRoom = function(room) {
        socket.emit('subscribe', room._id);
        USER.roomID = room._id;
        $location.path('/room');
    }
    
    
    //used to get people in room display that aren't the person choosing
    function parseRoomName(room, username) {
        
        room.forEach(function(element){
            element.people.forEach(function(elementPeople){
                if (elementPeople != username) {    
                    if (!element.roommates) {
                        //need to define roomates for first time
                        element.roommates = elementPeople;
                    } else {
                        element.roommates += ", " + elementPeople;
                    }
                }
            }); //end of people loop           
        });  //end of room loop     
       
    }
    
        
    var init = function (scope) {
        $http.get("/api/users").success(function(data){
        
            $scope.users = data;
        });
    };
    
  
init();
});