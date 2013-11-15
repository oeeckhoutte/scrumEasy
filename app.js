
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs   = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('socketPort', process.env.SOCKETPORT || 3001)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
//if ('development' == app.get('env')) {
  app.use(express.errorHandler());
//}

//set up the ORM
require('./lib/orm').setup('/home/dave/sites/nodejs/scrumEasy/lib/models', "scrumEasy", "scrumEasy", "dodgy", {
    host: 'localhost',
    dialect: 'mysql'
}).sync();

//set up the active controllers
var controllerFiles = fs.readdirSync('controllers');
var activeControllers = {};

controllerFiles.forEach(function (controllerFile) {
    if (controllerFile.indexOf('.js') === -1) {
        return;
    } else {
        controllerFile = controllerFile.replace('.js', '');
        var controller = require('./controllers/' + controllerFile);
        controller.setup(app);
        activeControllers[controller.identifier] = controller;
    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(app.get('socketPort'), function() {
    console.log('Listening for sockets on port ' + app.get('socketPort'));
});

io.sockets.on('connection', function(socket) {
    socket.emit('debug', {
        'message': 'You are connected to the socket service for scrumEasy'
    });

    socket.on('message', function(data, fn) {
        console.log('Received message for route:', data.eventName);
        console.log(data);

        //route the request through to the appropriate controller/method
        var parts      = data.eventName.split('/');
        var controller = parts[0];
        var action     = parts[1];

        //call the controller/action that we're routing to
        activeControllers[controller][action](data, {
            send: fn
        });
    });
});

io.sockets.on