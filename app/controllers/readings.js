var mongoose = require('mongoose');
var socketio = require('../socketio');

Reading = mongoose.model('Reading');
Patient = mongoose.model('Patient');

// Load the reading object when :id specified
exports.reading = function(req, res, next, id) {
	Reading.findById(id, function(err, reading) {
		if (err) {
			return next(err);
		}
		if (!reading) {
			return next(new Error('Reading ' + id + ' not found.'));
		}
		req.reading = reading;
		next();
	});
};

// GET /api/patient/:id/readings
exports.index = function(req, res) {
	Reading.find({patient_id: req.patient._id}, function(err, readings) {
		res.json(readings);
	});
};

// POST /api/patient/:id/readings
exports.create = function(req, res) {
	var reading = new Reading(req.body);
	reading.patient_id = req.patient._id;
	Reading.create(reading, function(err, reading) {
		if (err) {
			res.jsonp(409, {
				error: 'Reading already exists'
			});
		} else {
			Patient.findByIdAndUpdate(reading.patient_id, { $set: { last_reading: reading._id }}, function(err, patient) {
				socketio.send('/reading', reading, req.headers['x-socket-client-id']);
				res.json(reading);
			});
		}
	});
};
