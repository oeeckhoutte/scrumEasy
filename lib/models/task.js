//Getting the orm instance
var orm = require('../orm'),
    consts = orm.Seq(),
    seq = orm.seq();

module.exports = {
    model: {
        name:          { type: consts.STRING, validate: { notEmpty: true } },
        description:   { type: consts.TEXT },
        dateCompleted: { type: consts.DATE, validate: { isDate: true } }
    },
    relations: {
        belongsTo: [
            { model: 'Sprint', options: { foreignKey: 'sprintId' } },
            { model: 'User', options: { as: 'Author', foreignKey: 'authorId' } },
            { model: 'User', options: { as: 'AssignedUser', foreignKey: 'assignedUserId' } },
            { model: 'Status', options: { foreignKey: 'statusId' } }
        ]
    },
    options: {
        id: 'Task'
    }
};