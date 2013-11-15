//Getting the orm instance
var orm = require('../orm'),
    consts = orm.Seq(),
    seq = orm.seq();

module.exports = {
    model: {
        emailAddress: { type: consts.STRING, unique: true, validate: { isEmail: true } },
        password:     { type: consts.STRING }
    },
    relations: {
        hasMany: {
            model: 'UserGroup',
            options: {
                joinTableName: 'userHasGroups'
            }
        }
    },
    options: {
        id: 'User'
    }
};