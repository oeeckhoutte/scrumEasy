//Getting the orm instance
var orm = require('../orm'),
    consts = orm.Seq(),
    seq = orm.seq();

module.exports = {
    model: {
        name:         { type: consts.STRING, validate: { notEmpty: true } },
        type:         { type: consts.STRING, validate: { notEmpty: true } },
        displayOrder: { type: consts.INTEGER }
    },
    relations: {
        hasMany: [
            { model: 'Task', options: { foreignKey: 'taskId' } }
        ]
    },
    options: {
        id: 'Status'
    }
};