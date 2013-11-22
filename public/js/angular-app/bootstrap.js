var scrumEasy = angular.module('scrumEasy', ['ngRoute']);

//bootstrap the application
scrumEasy.config(['$routeProvider', function($routeProvider) {
    //set up the application routes
    $routeProvider
        .when('/', {
            templateUrl: '/partials/controllers/index/login.html',
            controller: 'LoginController'
        })
        .when('/sprint/dashboard/:sprintId', {
            templateUrl: '/partials/controllers/sprint/dashboard.html',
            controller: 'SprintDashboardController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);


function _showError(error)
{
    alert(error);
}
