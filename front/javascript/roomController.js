app.controller('RoomController', function($scope, $http, $rootScope, $location, USER) {

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
        checkifURL(message);
        $http.post("/api/rooms/updateChat", newChat).success(function(data){
            $scope.roomData.chats.push(newChat.chat);
            $scope.roomData.chats.forEach(function(element){element.time = new Date(element.time);})
        }).error(function(err){
            //TODO
            alert(err);
        });
        document.getElementById("textBoxChat").value = "";
    }
    
    $scope.pinMessage = function(event, x) {
        if (x.pinned == "true") {
            event.target.src="../img/arrow-right.png";
            x.pinned = "false";
            console.log("unpin");
        } else {
            event.target.src="../img/arrow-left.png";
            x.pinned = "true";
        }
    }

    function checkIfURL(textLine) {      
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/; 
             if(!regex.test(str)) {
                 console.log("Not a website");
             } else {
                 console.log("works great!!!!!!")
             }
         }

    
    $scope.sendFile = function() {
        var file = document.getElementById("newFile").value;
        var filename = file.replace(/^.*[\\\/]/, '');
        document.getElementById("newFile").value = "";
        var newFile = {
            "_id" : $scope.roomData._id,
            "filename" : filename,
            "file" : file
        }
        console.log(filename);
        $http.post("/api/rooms/updateFiles", newFile).success(function(data){
            
        }).error(function(err){
            //TODO
            alert(err);
        });
    }
    
    updateScroll = function() {
        setTimeout(function() {
        var element = document.getElementById("messageBoard");
        element.scrollTop = element.scrollHeight;
        }, 200);
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
        socket.emit("enteredRoom", {room: USER.roomID, username : USER.username});
        updateScroll();
    };
    
    $scope.currentUsers = []; //initial
    socket.on("updateRoomUser", function(data) {
       $scope.currentUsers = data.users;
    });
    socket.on("addRoomUser", function(data) {
        $scope.currentUsers.push(data.username);
        $scope.$apply();    
    });
    socket.on("removeRoomUser", function(data) {
        var userIndex;
        $scope.currentUsers.forEach(function(element, index){
            if (element.username == data.username) {
                userIndex = index;
            }
        });

        $scope.currentUsers.splice(userIndex, 1)
        $scope.$apply();
    });
    var colorText = ["red","blue","aqua","pink","violet","yellow","orange","green","gold","gray"];
   $scope.setTextColor = function(index){
	
   }
   
  
    
init();
});