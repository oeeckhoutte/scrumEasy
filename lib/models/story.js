//Getting the orm instance
var orm = require('../orm'),
    consts = orm.Seq(),
    seq = orm.seq();

module.exports = {
    model: {
        name:   { type: consts.STRING, validate: { notEmpty: true } },
        cos:    { type: consts.STRING(2000), validate: { notEmpty: true } },
        points: { type: consts.INTEGER }
    },
    relations: {
        hasMany: [
            { model: 'Task', options: { foreignKey: 'taskId' } }
        ],
        belongsTo: [
            { model: 'User', options: { as: 'Author', foreignKey: 'authorId' } },
            { model: 'Team', options: { as: 'Team', foreignKey: 'teamId' } },
            { model: 'StoryCategory', options: { as: 'Category', foreignKey: 'categoryId' } },
            { model: 'Sprint', options: { as: 'Sprint', foreignKey: 'sprintId' }}
        ]
    },
    options: {
        id: 'Story'
    }
};