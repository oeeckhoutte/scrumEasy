require('../lib/orm');

module.exports = {
    identifier: 'user',

    setup: function(app)
    {
        app.get('/user/:userId', function(req, res) {
            return res.json({
                url: req.url,
                userId: req.params.userId
            });
        });
    },

    checkCredentials: function(socket, data)
    {
        return socket.emit(User.count());
    }
};