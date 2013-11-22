var orm = require('../lib/orm');

module.exports = {
    identifier: 'user',

    setup: function(app)
    {

    },

    checkCredentials: function(request, response)
    {
        orm.model('User').checkCredentials(request.param('username'), request.param('password'))
            .success(function(user) {
                //associate the user with the socket connection
                request.socket.set('user', user, function() {
                    //send the OK response down to the user
                    response.ok({
                        user: user
                    });
                });
            })
            .error(function(err) {
                console.log(err);
                response.fail({
                    message: 'Invalid credentials'
                });
            });
    },

    logout: function(request, response)
    {
        request.socket.set('user', null);
        request.socket.disconnect();
        response.ok();
    }
};