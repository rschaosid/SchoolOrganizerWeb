
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.ui.home);

app.get('/classes', routes.ui.classList);
app.get('/class/:classid', routes.loadClass, routes.ui.classDetail);
app.get('/newClass', routes.ui.newClass);

app.get('/students', routes.ui.studentList);
app.get('/student/:studentid', routes.loadStudent, routes.ui.studentDetail);
app.get('/newStudent', routes.ui.newStudent);

app.get('/enrollment/:studentid/:semester/:block', routes.loadStudent, routes.ui.enrollmentDetail);

app.post('/api/newClass', routes.api.newClass);
app.post('/api/removeClass', routes.loadClass, routes.api.removeClass);
app.post('/api/addSession', routes.loadClass, routes.api.addSession);
app.post('/api/removeSession', routes.loadClass, routes.api.removeSession);

app.post('/api/newStudent', routes.api.newStudent);
app.post('/api/removeStudent', routes.loadStudent, routes.api.removeStudent);

app.post('/api/enroll', routes.loadStudent, routes.loadClass, routes.api.enroll);
app.post('/api/unenroll', routes.loadStudent, routes.loadClass, routes.api.unenroll);

app.post('/api/setAttendance', routes.loadStudent, routes.loadClass, routes.api.setAttendance);
app.post('/api/setGrade', routes.loadStudent, routes.loadClass, routes.api.setGrade);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
