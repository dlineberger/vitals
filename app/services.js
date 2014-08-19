var acmeServices = angular.module('acmeServices', []);

var patients =
	[
		{ _id: 0, name: 'David Lineberger' },
		{ _id: 1, name: 'Wanwisa Lineberger' },
		{ _id: 2, name: 'John Doe' },
		{ _id: 3, name: 'Jane Doe' }
	];

acmeServices.factory('Patient', function() {
	return {
		all: function() {
			return patients;
		},
		query: function(id) {
			return patients[id];
		}
	};
});

acmeServices.factory('Reading', function() {
	return {
		query: function(id) {
			return [
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
		},
		post: function(id, reading) {
		}
	};
});
