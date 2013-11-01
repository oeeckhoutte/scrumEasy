module.exports = {
    identifier: 'frontend',

    setup: function(app)
    {
        app.get('/', function(req, res) {
            return res.render('index');
        });
    }
};
