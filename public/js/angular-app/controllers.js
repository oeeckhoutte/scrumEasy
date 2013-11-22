scrumEasy.controller('LoginController', ['$scope', '$location', 'user', 'socket', function($scope, $location, user, socket) {

    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.processLogin = function(credentials)
    {
        //ensuring socket io connection is valid
        if (! socket.connected()) {
            socket.reconnect();
        }

        Se.Log('Starting login procedure...');
        user.credentialsAreValid(credentials.username, credentials.password, function(response) {
            var data = response.data();
            if (response.isOk()) {
                Se.Log('Logged in successfully as ' + data.user.emailAddress);
                user.setCurrentUser(data.user);
                //redirect to the dashboard page
                $location.path('/sprint/dashboard/1');
            } else {
                //otherwise there was an authentication problem, and we'll need the user to retry their login
                _showError(response.data().message);
                Se.Log('Failed login (' + data.message + ')');
            }
        });
    };
}]);

scrumEasy.controller('SprintDashboardController', ['$scope', 'dashboard', function($scope, dashboard) {
    $scope.stories = [];

    var sprintId = 1;

    dashboard.setSprintId(sprintId);

    //get stories and their respective tasks from the server and push them into the scope
    dashboard.getStories(function(response) {
        if (response.isOk()) {
            $scope.stories = response.data().stories;
        }
    });

    dashboard.on('story/add', function(story) {
        console.log(story);
        $scope.stories.push(story);
    });

    dashboard.on('story/update', function(story) {
        //find the story in the $scope array and update it
    });

    dashboard.on('story/delete', function(story) {
        //find the story in the $scope array and remove it
    });
}]);

/**
 * Controller for the menu bar across the top of the screen
 */
scrumEasy.controller('MenuController', ['$scope', '$location', 'user', function($scope, $location, user) {
    $scope.user = user.current();

    $scope.logout = function()
    {
        Se.Log('Logging out...');

        user.logout(function() {
            $location.path('/');
        });
    }
}]);