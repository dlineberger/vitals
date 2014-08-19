var mongoose = require('mongoose');
Patient = mongoose.model('Patient');

// Load the patient object when :id specified
exports.patient = function(req, res, next, id) {
	Patient.findById(id, function(err, patient) {
		if (err) {
			return next(err);
		}
		if (!patient) {
			return next(new Error('Patient ' + id + ' not found.'));
		}
		req.patient = patient;
		next();
	});
};

// GET /api/patients
exports.index = function(req, res) {
	Patient.find({}, function(err, patients) {
		res.json(patients);
	});
};

// POST /api/patients
exports.create = function(req, res) {
	var patient = new Patient(req.body);
	Patient.create(patient, function(err, patient) {
		if (err) {
			res.jsonp(409, {
				error: 'Patient already exists'
			});
		} else {
			res.json(patient);
		}
	});
}

// GET /api/patients/:id
exports.show = function(req, res) {
	res.json(req.patient);
}
