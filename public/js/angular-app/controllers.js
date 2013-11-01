scrumEasy.controller('ListingController', ['$scope', 'listing', '$routeParams', function($scope, listing, $routeParams) {
    $scope.listing = listing.connect({ name: $routeParams.modelName});
}]);

scrumEasy.controller('LoginController', ['$scope', 'user', function($scope, user) {

    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.processLogin = function(credentials)
    {
        console.log('Processing login...');
        user.credentialsAreValid(credentials.username, credentials.password);
    };
}]);