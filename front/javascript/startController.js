app.controller('StartController', function($scope, $http, $rootScope, $location) {

//    var socket = io.connect();

    $scope.pickUser = function(user) {
        $scope.pickedUser = user;
        console.log(user);
        $http.get("/api/rooms/byUser/"+user.username).success(function(data){
            console.log(data);
            $scope.rooms = data;
        });
    }
    
    var init = function () {
        $http.get("/api/users").success(function(data){
            console.log(data);
            $scope.users = data;
        });
    };
    
   $scope.scopeTest = "ScopeTest"    
  
    
init();
});