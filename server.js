var _ = require('underscore');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

require(__dirname + '/app/models');
var Patient = mongoose.model('Patient');
var Reading = mongoose.model('Reading');

var db = mongoose.connect("mongodb://localhost/acme");

app.use(express.json());

require(__dirname + '/app/router')(app);

app.use(express.static('public'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
