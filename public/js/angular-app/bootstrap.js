var scrumEasy = angular.module('scrumEasy', []);

//bootstrap the application
scrumEasy.config(['$routeProvider', function($routeProvider) {
    //set up the application routes
    $routeProvider
        .when('/', {
            templateUrl: '/partials/controllers/index/login.html',
            controller: 'LoginController'
        })
        .when('/listing/:modelName', {
            templateUrl: '/partials/controllers/listing/listing.html',
            controller: 'ListingController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
