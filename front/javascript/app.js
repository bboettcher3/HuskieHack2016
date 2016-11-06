//main module
var app = angular.module('app', ['ngRoute']);

//sets rootscope value prior to anything
app.run(function($rootScope) {
    $rootScope.rootTest = "RootScope";    
});

//routes to different views of different pages
app.config(['$routeProvider', function($routeProvider) {
    
  $routeProvider.
    when('/', {
      templateUrl: 'templates/start.html',
      controller:  'StartController'
    }).
    when('/room', {
      templateUrl: 'templates/room.html',
      controller:  'RoomController',
      controllerAs: 'Room'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);


