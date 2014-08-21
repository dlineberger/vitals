var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var db_host = 'localhost';
var db_port = '27017';
var db_name = 'vitals';

if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
	db_host = process.env.OPENSHIFT_MONGODB_DB_HOST;
}
if (process.env.OPENSHIFT_MONGODB_DB_PORT) {
	db_port = process.env.OPENSHIFT_MONGODB_DB_PORT;
}

var mongodb_connection_string = 'mongodb://' + db_host + ':' + db_port + '/' + db_name;

var _ = require('underscore');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var socketio = require('./app/socketio');

var mongoose = require('mongoose');

require(__dirname + '/app/models');
var Patient = mongoose.model('Patient');
var Reading = mongoose.model('Reading');

var db = mongoose.connect(mongodb_connection_string);

app.use(express.json());

require(__dirname + '/app/router')(app);

app.use(express.static('public'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

var server = app.listen(server_port, server_ip_address, function() {
	socketio.listen(server);
	console.log('Listening on port %d', server.address().port);
});
