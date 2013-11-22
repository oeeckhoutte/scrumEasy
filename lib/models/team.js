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
            { model: 'User', options: { foreignKey: 'userId' }}
        ]
    },
    options: {
        id: 'Team'
    }
};