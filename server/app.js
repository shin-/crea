var express = require('express');
var http = require('http');
var path = require('path');

var plugins = require('./plugins');

var app = express();

// all environments
app.set('port', process.env.CREA_PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.directory(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
    res.send({
        'application': 'CREA',
        'status': 'running',
        'location': 'root'
    });
});

plugins.start(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server: http://0.0.0.0:' + app.get('port'));
});
