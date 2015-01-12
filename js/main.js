var app = angular.module('myApp', []);
var apiKey = 'MDE3OTA1NjcwMDE0MjA2OTU2NDc2OTM5OQ001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerController', function($scope, $http) {
  
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = 'media/npr.mp4';
    $scope.play = function() {
    $scope.audio.play();
    $scope.playing = true;
  };
    $scope.stop = function() {
    $scope.audio.pause();
    $scope.playing = false;
  };
    $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    });
  });
  
  // construct our http request
  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
  // Store the list of stories on the scope
  // from the NPR API response object (described above)
  $scope.programs = data.list.story;
}).error(function(data, status) {
    // Some error occurred
  });
});

app.controller('RelatedController', ['$scope', function($scope) {
}]);


app.run(function($rootScope) {
  $rootScope.name = "Dhruti Mesariya";
});

app.controller('MyController', function($scope) {
  $scope.person = { name: "Dhruti Parin Mesariya" };
  //$scope.dt = new Date();
  var updateClock = function() {
    $scope.clock = new Date();
  };
  $scope.dt= updateClock;
  
  var timer = setInterval(function() {
    $scope.$apply(updateClock);
  }, 1000);
  updateClock();
  
  
});


app.controller('ParentController', function($scope) {
  $scope.person = {greeted: false};
});

app.controller('ChildController', function($scope) {
  $scope.sayHello = function() {
    $scope.person.greeted = true;
  }
});
