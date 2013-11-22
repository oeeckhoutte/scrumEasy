var filesystem = require('fs');
var models = {};
var relationships = {};

var singleton = function singleton()
{
    var Sequelize = require('sequelize');
    var sequelize = null;
    var modelsPath = "";

    this.setup = function (path, database, username, password, obj)
    {
        modelsPath = path;

        if(arguments.length == 3){
            sequelize = new Sequelize(database, username);
        } else if (arguments.length == 4){
            sequelize = new Sequelize(database, username, password);
        } else if (arguments.length == 5){
            sequelize = new Sequelize(database, username, password, obj);
        }
        init();
        return this;
    }

    this.model = function (name)
    {
        return models[name];
    }

    this.seq = function ()
    {
        return sequelize;
    }

    this.Seq = function()
    {
        return Sequelize;
    }

    this.sync = function()
    {
        this.seq().sync();
    }

    function init()
    {
        filesystem.readdirSync(modelsPath).forEach(function(name) {

            var object = require(modelsPath + "/" + name);
            var options = object.options || {};
            var modelName = options.id || name.replace(/\.js$/i, "");

            models[modelName] = sequelize.define(modelName, object.model, options);

            if ('relations' in object) {
                relationships[modelName] = object.relations;
            }
        });

        for (var modelName in relationships) {
            var relations = relationships[modelName];
            for (var relType in relations) {

                var relTypeDefinitions = relations[relType];

                //ensure that we're dealing with an array of relations for each relation type
                if (relTypeDefinitions.hasOwnProperty('model')) {
                    relTypeDefinitions = [relTypeDefinitions];
                }

                for (var i in relTypeDefinitions) {
                    var relation = relTypeDefinitions[i];

                    var relationOptions = relation.options || {};

                    console.log('Creating relation ' + modelName + ' ' + relType + ' ' + relation.model);

                    models[modelName][relType](models[relation.model], relationOptions);
                }
            }
        }

        console.log("Initialised " + Object.keys(models).length + " models");
    }

    if (singleton.caller != singleton.getInstance) {
        throw new Error("This object cannot be instantiated");
    }
}

singleton.instance = null;

singleton.getInstance = function() {
    if (this.instance === null) {
        this.instance = new singleton();
    }
    return this.instance;
}

module.exports = singleton.getInstance();