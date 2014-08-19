var patients = require('./controllers/patients');
var readings = require('./controllers/readings');

module.exports = function(app) {
	app.get('/api/patients', patients.index);
	app.post('/api/patients', patients.create);
	app.get('/api/patients/:id', patients.show);
	app.get('/api/patients/:id/readings', readings.index);
	app.post('/api/patients/:id/readings', readings.create);
	app.param(':id', patients.patient);
};
