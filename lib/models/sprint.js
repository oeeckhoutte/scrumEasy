//Getting the orm instance
var orm = require('../orm'),
    consts = orm.Seq(),
    seq = orm.seq();

module.exports = {
    model: {
        name:        { type: consts.STRING, validate: { isNotNull: true } },
        startDate:   { type: consts.DATE, validate: { isDate: true } },
        endDate:     { type: consts.DATE, validate: { isDate: true } }
    },
    relations: {
        hasMany: [
            { model: 'Task', options: { foreignKey: 'taskId' } }
        ],
        belongsTo: [
            { model: 'Team', options: { foreignKey: 'teamId' } }
        ]
    },
    options: {
        id: 'Sprint'
    }
};