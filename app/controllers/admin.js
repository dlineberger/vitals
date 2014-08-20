var mongoose = require('mongoose');

Patient = mongoose.model('Patient');
Reading = mongoose.model('Reading');

// Convenience method to clear DB
exports.clear = function(req, res) {
	Patient.remove({}, function(err) {
		Reading.remove({}, function(err) {
			res.redirect("/");
		});
	});
};
