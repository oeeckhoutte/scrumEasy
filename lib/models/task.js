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
        hasOne: [
            { model: 'Sprint' },
            { model: 'User', options: { as: 'Author', foreignKey: 'AuthorId' } },
            { model: 'User', options: { as: 'AssignedUser', foreignKey: 'AssignedUserId'} },
            { model: 'Status' }
        ]
    },
    options: {
        id: 'Task'
    }
};