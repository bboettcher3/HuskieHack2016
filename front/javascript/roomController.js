app.controller('RoomController', function($scope, $http, $rootScope, $location) {

//    var socket = io.connect(); 
    $scope.sendMessage = function() {
        var message = document.getElementById("textBoxChat").value;
        document.getElementById("textBoxChat").value = "";
        console.log(message);
    }
    $scope.sendFile = function() {
        var message = document.getElementById("newFile").value;
        document.getElementById("newFile").value = "";
    }
    // function calls submit if enter is hit while text is being entered
    $("#textBoxChat").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        $scope.sendMessage();
    }
    });
    
    var init = function () {
        $http.get("/api/rooms").success(function(data){
            $scope.roomData = data[0];
        });
        //$scope.roomData = {"_id":"581e517994e0802cf333c7b2","links":[],"files":[],"pictures":[],"chats":[{"message":"Hey Petr!","from":"bbottecher","time":3},{"message":"you there?","from":"bboettcher","time":2}],"people":["bboettcher","petr"]};
    };
    
   $scope.scopeTest = "ScopeTest"    
  
    
init();
});