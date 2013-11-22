var orm = require('../lib/orm');

module.exports = {
    identifier: 'sprint',

    setup: function(app)
    {

    },

    stories: function(request, response)
    {
        var ret = [];

        orm.model('Story').findAll({
            where: {
                sprintId: request.param('sprintId')
            }
        }).success(function(stories) {
            //populate each story with it's tasks
            for (var i in stories) {
                var combinedStory = stories[i];
                combinedStory.tasks = combinedStory.getTasks();
                ret.push(combinedStory);
            }

            response.ok({
                stories: ret
            });
        }).error(function() {
            response.fail({ 'message': 'Could not find stories for sprint ' + request.param('sprintId') });
        });
    }
};