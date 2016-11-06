app.controller('RoomController', function($scope, $http, $rootScope, $location) {

//    var socket = io.connect(); 
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
        $http.post("/api/rooms/updateChat", newChat).success(function(data){
            $scope.roomData.chats.push(newChat.chat);
            $scope.roomData.chats.forEach(function(element){element.time = new Date(element.time);})
            console.log($scope.roomData.chats);
            //$scope.roomData.chats.sort(function(a, b) { return b.time - a.time; });
        }).error(function(err){
            //TODO
            alert(err);
        });
        document.getElementById("textBoxChat").value = "";
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
    // function that filters messages
    $("#searchChat").keypress(function(event) {
        event.preventDefault();
        var message = document.getElementById("searchChat").value;
        for (var i = 0; i < $scope.roomData.chats.length; i++) {
            for (message in chats[i].message) {
                console.log(message);
            }
        }
        //console.log("test");
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