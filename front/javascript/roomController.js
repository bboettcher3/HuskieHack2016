app.controller('RoomController', function($scope, $http, $rootScope, $location) {

//    var socket = io.connect(); 
    $scope.sendMessage = function() {
        var message = document.getElementById("textBoxChat").value;
        document.getElementById("textBoxChat").value = "";
        console.log(message);
    }
    
    var init = function () {
        $http.get("/api/rooms").success(function(data){
            $scope.roomData = data[0];
            console.log($scope.roomData);
                
        });
        $scope.roomData = {"_id":"581e517994e0802cf333c7b2","links":[],"files":[],"pictures":[],"chats":[{"message":"Hey Petr!","from":"bbottecher","time":3},{"message":"you there?","from":"bboettcher","time":2}],"people":["bboettcher","petr"]};
    };
    
   $scope.scopeTest = "ScopeTest"    
  
    
init();
});