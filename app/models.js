var mongoose = require('mongoose');

var PatientSchema = mongoose.Schema({
	name: {
		first: { type: String },
		last: { type: String },
	},
	last_reading: { type: mongoose.Schema.Types.ObjectId, ref: 'Reading' }
});

var ReadingSchema = mongoose.Schema({
	patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
	timestamp: { type: Date, default: Date.now },
	pulse_bpm: { type: Number },
	temperature_degf: { type: Number },
	blood_pressure_sys: { type: Number },
	blood_pressure_dia: { type: Number },
	respiratory_rate_rpm: { type: Number }
});

mongoose.model('Patient', PatientSchema);
mongoose.model('Reading', ReadingSchema);
