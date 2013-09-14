
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var dgram = require("dgram");

var udp = dgram.createSocket("udp4");

udp.on("message", function (msg, rinfo) {
  // console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
  try {
    var xyz = JSON.parse(String(msg));
    console.log(xyz);
    io.sockets.emit('news', Date.now(), xyz);
    console.log('broadcast')
  } catch (e) {
  }
});

udp.on("listening", function () {
  var address = udp.address();
  console.log("server listening " + address.address + ":" + address.port);
});

udp.bind(4444);


app.get('/', routes.index);
app.get('/users', user.list);


console.log('Express server listening on port http://localhost:' + app.get('port'));
