var _ = require('underscore');
var express = require('express');
var app = express();

var patients = [
	{ _id: 0, name: 'David Lineberger' },
	{ _id: 1, name: 'Wanwisa Lineberger' },
	{ _id: 2, name: 'John Doe' },
	{ _id: 3, name: 'Jane Doe' }
];

var readings = [
	{
		timestamp: '2014-01-01T23:28:56.782Z',
		pulse_bpm: 72,
		temperature_degf: 98.9,
		blood_pressure_sys: 121,
		blood_pressure_dia: 81,
		respiratory_rate_rpm: 19
	},
	{
		timestamp: '2014-01-04T23:28:56.782Z',
		pulse_bpm: 73,
		temperature_degf: 98.6,
		blood_pressure_sys: 122,
		blood_pressure_dia: 79,
		respiratory_rate_rpm: 21
	},
	{
		timestamp: '2014-01-05T23:28:56.782Z',
		pulse_bpm: 72,
		temperature_degf: 98.8,
		blood_pressure_sys: 131,
		blood_pressure_dia: 81,
		respiratory_rate_rpm: 22
	},
	{
		timestamp: '2014-01-19T23:28:56.782Z',
		pulse_bpm: 72,
		temperature_degf: 98.9,
		blood_pressure_sys: 121,
		blood_pressure_dia: 81,
		respiratory_rate_rpm: 19
	},
	{
		timestamp: '2014-01-20T23:28:56.782Z',
		pulse_bpm: 73,
		temperature_degf: 98.6,
		blood_pressure_sys: 122,
		blood_pressure_dia: 79,
		respiratory_rate_rpm: 21
	},
	{
		timestamp: '2014-01-22T23:28:56.782Z',
		pulse_bpm: 72,
		temperature_degf: 98.8,
		blood_pressure_sys: 131,
		blood_pressure_dia: 81,
		respiratory_rate_rpm: 22
	},
	{
		timestamp: '2014-02-01T23:28:56.782Z',
		pulse_bpm: 73,
		temperature_degf: 98.6,
		blood_pressure_sys: 122,
		blood_pressure_dia: 79,
		respiratory_rate_rpm: 21
	},
	{
		timestamp: '2014-02-02T23:28:56.782Z',
		pulse_bpm: 72,
		temperature_degf: 98.8,
		blood_pressure_sys: 131,
		blood_pressure_dia: 81,
		respiratory_rate_rpm: 22
	},
	{
		timestamp: '2014-02-04T23:28:56.782Z',
		pulse_bpm: 72,
		temperature_degf: 98.9,
		blood_pressure_sys: 121,
		blood_pressure_dia: 81,
		respiratory_rate_rpm: 19
	},
	{
		timestamp: '2014-02-10T23:28:56.782Z',
		pulse_bpm: 73,
		temperature_degf: 98.6,
		blood_pressure_sys: 122,
		blood_pressure_dia: 79,
		respiratory_rate_rpm: 21
	},
	{
		timestamp: '2014-02-11T23:28:56.782Z',
		pulse_bpm: 72,
		temperature_degf: 98.8,
		blood_pressure_sys: 131,
		blood_pressure_dia: 81,
		respiratory_rate_rpm: 22
	}
];

app.get('/api/patients', function(req, res) {
	res.json(patients);
});

app.post('/api/patients', function(req, res) {
	var patient = patients.push(req.body);
	res.json(patient);
});

app.get('/api/patients/:id', function(req, res) {
	var id = parseInt(req.params.id);
	res.json(_.findWhere(patients, {_id: id}));
});

app.get('/api/patients/:id/readings', function(req, res) {
	res.json(readings);
});


app.use(express.static('public'));
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
