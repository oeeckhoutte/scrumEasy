var orm = require('../lib/orm');

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

    checkCredentials: function(reqeust, response)
    {
        response.send({count: 5});
    }
};