scrumEasy.factory('socket', function($rootScope) {
    var ioSocket = io.connect('http://localhost:3001');
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
        }
    };

    socket.on('debug', function(data) {
        console.log('### DEBUG: ', data);
    });

    return socket;
});

scrumEasy.factory('listing', ['socket', function(socket) {
    return {
        //connect grabs data over the socket for page initialisation,
        //then subscribes to any future updates of the listing
        connect: function(url, postData, callback) {
            //combine the URL and any data
            socket.emit(url, postData, callback);

            //listen for events on the socket
            socket.on('listing:update', function(data) {
                //when an update is pushed from the server, update the listing
                callback.apply(socket, data);
            });
        }
    };
}]);

scrumEasy.factory('user', ['socket', function(socket) {
    return {
        credentialsAreValid: function(username, password) {
            var data = {username: username, password: password};
            console.log('Checking credentials...');
            socket.emit('user/checkCredentials', data, function(response) {
                console.log(response);
            });
        }
    };
}]);