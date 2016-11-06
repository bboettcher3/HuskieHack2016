app.controller('RoomController', function($scope, $http, $rootScope, $location, USER) {

    $scope.roomID = USER.roomID;
    $scope.query = {};
    $scope.queryBy = '$';
    $scope.sendMessage = function() {
        var message = document.getElementById("textBoxChat").value;
        var newChat = {
            "_id" : $scope.roomData._id,
            "chat" : {
                "time" : new Date(),
                "from" : USER.username,
                "message" : message,
                "pinned" : "false"
            }
        }
        /*checkifURL(message);*/
        $http.post("/api/rooms/updateChat", newChat).success(function(data){
            socket.emit('newMessage', {chat: newChat, room: $scope.roomID});
            $scope.roomData.chats.push(newChat.chat);
            $scope.roomData.chats.forEach(function(element){element.time = new Date(element.time);})            
            updateScroll();
        }).error(function(err){
            //TODO
            alert(err);
        });
        document.getElementById("textBoxChat").value = "";
    }
    
    $scope.pinMessage = function(event, x) {
        if (x.pinned == "true") {
            x.pinned = "false";
            event.target.src="../img/arrow-right.png";
            $http.post("/api/rooms/updateTextPin", {_id : $scope.roomData._id, chats : $scope.roomData.chats}).success(function(data){
                //do nothing for now
            }).error(function(err){
            //TODO
            alert(err);
            });
        } else {
            x.pinned = "true";
            $http.post("/api/rooms/updateTextPin", {_id : $scope.roomData._id, chats : $scope.roomData.chats}).success(function(data){
                //do nothing for now
            }).error(function(err){
            //TODO
            alert(err);
        });
            event.target.src="../img/arrow-left.png";
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
        $http.post("/api/rooms/updateFiles", newFile).success(function(data){  
        }).error(function(err){
            //TODO
            alert(err);
        });
    }
    
    /*function checkIfURL(textLine) {      
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/; 
             if(regex.test(str)) {
                 //$scope.sendFile();
                 console.log("IT'S A MATCH!!!!!");
             } console.log("no go");
    }*/
    
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
    
    socket.on("updateMessages", function(data){
        console.log("newMessage");
        console.log(data);
        $scope.roomData.chats.push(data.chat);
        $scope.roomData.chats.forEach(function(element){element.time = new Date(element.time);})    
        updateScroll();               
        $scope.$apply();    
    });
    
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