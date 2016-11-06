app.controller('RoomController', function($scope, $http, $rootScope, $location) {

//    var socket = io.connect(); 
    
    $scope.query = {};
    $scope.queryBy = '$';
    $scope.sendMessage = function() {
        var message = document.getElementById("textBoxChat").value;
        var newChat = {
            "_id" : $scope.roomData._id,
            "chat" : {
                "time" : new Date(),
                "from" : "petr",
                "message" : message
            }
        }
        updateScroll();
        $http.post("/api/rooms/updateChat", newChat).success(function(data){
            $scope.roomData.chats.push(newChat.chat);
            $scope.roomData.chats.forEach(function(element){element.time = new Date(element.time);})
        }).error(function(err){
            //TODO
            alert(err);
        });
        document.getElementById("textBoxChat").value = "";
    }
    
    updateScroll = function() {
        setTimeout(function() {
        var element = document.getElementById("messageBoard");
        element.scrollTop = element.scrollHeight;
        }, 200);
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
        updateScroll();
        //$scope.roomData = {"_id":"581e517994e0802cf333c7b2","links":[],"files":[],"pictures":[],"chats":[{"message":"Hey Petr!","from":"bbottecher","time":3},{"message":"you there?","from":"bboettcher","time":2}],"people":["bboettcher","petr"]};
    };
    
   $scope.scopeTest = "ScopeTest"    
  
    
init();
});