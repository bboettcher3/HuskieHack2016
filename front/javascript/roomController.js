app.controller('RoomController', function($scope, $http, $rootScope, $location) {

//    var socket = io.connect();
    
    function getTest(){
//         $http.get("/api/test").success(function(data){
//            $scope.getResults = data;
//        });
    }   
    var init = function () {
        $http.get("/api/rooms").success(function(data){
            console.log(data[0]);
        });
    };
    
   $scope.scopeTest = "ScopeTest"    
  
    
init();
});