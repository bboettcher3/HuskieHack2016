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
        
        room.forEach(function(element){
            element.people.forEach(function(elementPeople){
                if (elementPeople != username) {    
                    if (!element.roommates) {
                        //need to define roomates
                        element.roommates = elementPeople;
                    } else {
                        element.roommates += ", " + elementPeople;
                    }
                }
            })
            
        })
        
        /*for(i = 0; i < room.length; i++) {
            break;
            console.log("room loop " + i);
            var roomVec = room[i].people; //grabs people array
            console.log(roomVec);
            for(j = 0; j < roomVec.length; j++) {
                            console.log("peo loop " + j);
                            console.log(roomVec[j]);

                if(roomVect[j] != username) {
                    if(room[i].roommates) {
                        
                    
                    room[i].roommates += roomVect[j] + " ";
                    } else {
                        room[i].roommates = roomVect[j] + " ";
                    }
                }
            }
        } console.log(room);*/
    }
        
        
                //room[i].roommates += check + " ";
            
    
        
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