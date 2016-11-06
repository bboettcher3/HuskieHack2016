var socketio = require('socket.io');

var GlobalSocketObject;
var _users = []; //{clientID: client.id, username : username, roomID: roomID}

module.exports.get_io = function(){
    return GlobalSocketObject;
}

module.exports.getUsers = function(){
    return _users;
}

module.exports.listen = function(server){
    
    io = socketio.listen(server);
    
    io.on('connection', function(socket) {    
        
        console.log("connecting" + socket.id);  
        
        _users.push({clientID: socket.id}); //adds user
        
        socket.on('subscribe', function(room) { 
            console.log('joining room', room);
            socket.join(room); 
        })
        
        //right now we assume only leave on disconnect
        socket.on('unsubscribe', function(room) {  
            console.log('leaving room', room);
            socket.leave(room); 
        })

        socket.on('newMessage', function(data) {
            console.log('sending message');
            console.log(data);
            socket.broadcast.to(data.room).emit('updateMessages', {chat : data.chat.chat});
        });

        socket.on('enteredRoom', function(data){
            //foreach loop used for two purposes
            var returnUsers = [];
            var userIndex;  //finds index of current sender
            _users.forEach(function(element, index){
                //checks for current user
                if (element.clientID == socket.id) {
                    userIndex = index;
                }
                
                if (element.roomID == data.room) {
                    returnUsers.push(element.username);
                }
            });
            
            //sends back a list of users names            
            socket.emit('updateRoomUser', {users: returnUsers}); 
            
            
            //adds new users info
            _users[userIndex].roomID = data.room;
            _users[userIndex].username = data.username;
            //tells everyone else
           socket.broadcast.to(data.room).emit('addRoomUser', {username: data.username});
        });
        

        //on disconnect of application
         socket.on('disconnect', function() { 
                                             
                          
             //removes user from current array
            var userIndex;
            _users.forEach(function(element, index){
                if (element.clientID == socket.id) {
                    userIndex = index;
                }
            });
             console.log("index: " + userIndex);
             console.log("room: " + _users[userIndex].roomID);
             
            socket.broadcast.to(_users[userIndex].roomID).emit('removeRoomUser', {username: _users[userIndex].username});
             _users.splice(userIndex, 1);
             
             socket.leave(_users[userIndex].roomID);
            
            console.log("disconnect" + socket.id);         
        });

        
    }); //io.on end

    GlobalSocketObject = io; //saves so other files can import it
    
    return io;
}