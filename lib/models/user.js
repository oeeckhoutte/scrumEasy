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
        hasMany: { model: 'UserGroup', options: { foreignKey: 'userGroupId' } }
    },
    options: {
        id: 'User',
        classMethods: {
            checkCredentials: function(username, password) {
                return orm.model('User').find({
                    where: { emailAddress: username, password: password }
                });
            }
        }
    }
};