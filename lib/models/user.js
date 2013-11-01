//Getting the orm instance
var orm = require('../orm'),
    seq = orm.seq();

console.log(seq.INTEGER);

var user = seq.define('User', {
    userId:       { type: seq.INTEGER, primaryKey: true, autoIncrement: true },
    emailAddress: { type: seq.STRING, unique: true, validate: { isEmail: true } },
    password:     { type: seq.STRING }
});

user.hasMany(UserGroup);

module.exports = {User: user};