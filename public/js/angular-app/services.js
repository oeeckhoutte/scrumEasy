scrumEasy.factory('socket', function($rootScope) {
    var ioSocket = io.connect('http://localhost:3001');

    ioSocket.on('debug', function(data) {
        console.log('### DEBUG: ', data);
    });

    var socket = {
        on: function (eventName, callback) {
            ioSocket.on('message', function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            data.eventName = eventName;
            ioSocket.emit('message', data, function () {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        get: function(url, callback) {
            ioSocket.get(url, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        reconnect: function() {
            Se.Log('Attempting to reconnect socket');
            ioSocket = io.connect('http://localhost:3001');
        },
        connected: function() {
            Se.Log('Socket is not connected');
            return ioSocket.connected;
        }
    };

    return socket;
});

scrumEasy.factory('user', ['socket', function(socket) {
    var _user;

    return {
        credentialsAreValid: function(username, password, callback) {
            var data = { username: username, password: password };
            console.log('Checking credentials...');
            socket.emit('user/checkCredentials', data, function(responseData) {
                //TODO this response object stuff would probably sit better in the socket service
                var responseObj = new Se.Response();
                responseObj.setRawResponse(responseData);
                callback(responseObj);
            });
        },
        setCurrentUser: function(user) {
            _user = user;
        },
        current: function() {
            return _user;
        },
        logout: function(callback) {
            socket.emit('user/logout', {}, function(responseData) {
                if (callback) {
                    callback(responseData);
                }
            });
        }
    };
}]);

scrumEasy.factory('dashboard', ['socket', function(socket) {

    var _sprintId;

    return {
        getStories: function(callback) {
            socket.emit('sprint/stories', { sprintId: _sprintId }, function(responseData) {
                //TODO this response object stuff would probably sit better in the socket service
                var responseObj = new Se.Response();
                responseObj.setRawResponse(responseData);
                callback(responseObj);
            });
        },
        setSprintId: function(sprintId) {
            _sprintId = sprintId;
        },
        on: function(eventName, callback) {
            //TODO add some code here so that the socket is subscribed to all dashboard broadcasts
            socket.on(eventName, callback);
        }
    };

}]);