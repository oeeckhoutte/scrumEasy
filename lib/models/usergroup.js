//Getting the orm instance
var orm = require('../orm'),
    seq = orm.seq();

//Creating our module
var usergroup = seq.define('UserGroup', {
    userGroupId: { type: seq.INTEGER, primaryKey: true, autoIncrement: true }
    name:        { type: seq.STRING, validate: { isNotNull: true } }
});

usergroup.hasMany(User);

module.exports = {UserGroup: usergroup};