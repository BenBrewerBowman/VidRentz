var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        // home
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        // add new video
        .when('/add-video', {
            templateUrl: 'partials/video-form.html',
            controller: 'AddVideoCtrl'
        })
        // edit video
        .when('/video/:id', {
            templateUrl: 'partials/video-form.html',
            controller: 'EditVideoCtrl'
        })
        // else go nowhere
        .otherwise({
            redirectTo: '/'
        });
}]);


// home
app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource){
        var Videos = $resource('/api/videos');
        Videos.query(function(videos){
            $scope.videos = videos;
        });
    }]);

// add new video
app.controller('AddVideoCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function(){
                $location.path('/');
            });
        };
    }
]);

// edit video
app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Videos = $resource('/api/videos/:id', { id: '@_id' }, {
            // cannot send put request in resource service
            update: { method: 'PUT' }
        });
        // get video with given id
        Videos.get({ id: $routeParams.id }, function(video){
            $scope.video = video;
        });
        // save button clicked
        $scope.save = function(){
            Videos.update($scope.video, function(){
                $location.path('/');
            });
        }
    }
]);
