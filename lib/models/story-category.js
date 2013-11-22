//Getting the orm instance
var orm = require('../orm'),
    consts = orm.Seq(),
    seq = orm.seq();

module.exports = {
    model: {
        name:   { type: consts.STRING, validate: { notEmpty: true } }
    },
    relations: {
        hasMany: [
            { model: 'Story', options: { foreignKey: 'storyId' } }
        ],
        belongsTo: [
            { model: 'Team', options: { foreignKey: 'teamId' }}
        ]
    },
    options: {
        id: 'StoryCategory'
    }
};