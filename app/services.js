var acmeServices = angular.module('acmeServices', []);

acmeServices.factory('Patient', function() {
	return {
		query: function(id) {
			return {
				name: 'David Lineberger',
				readings: [
					{
						timestamp: 0,
						pulse_bpm: 72,
						temperature_degf: 98.9,
						blood_pressure_sys: 121,
						blood_pressure_dia: 81,
						respiratory_rate_rpm: 19
					},
					{
						timestamp: 1,
						pulse_bpm: 73,
						temperature_degf: 98.6,
						blood_pressure_sys: 122,
						blood_pressure_dia: 79,
						respiratory_rate_rpm: 21
					},
					{
						timestamp: 2,
						pulse_bpm: 72,
						temperature_degf: 98.8,
						blood_pressure_sys: 131,
						blood_pressure_dia: 81,
						respiratory_rate_rpm: 22
					}
				]
			};
		}
	};
});
