var acmeServices = angular.module('acmeServices', []);

var patients =
	[
		{ _id: 0, name: 'David Lineberger' },
		{ _id: 1, name: 'Wanwisa Lineberger' },
		{ _id: 2, name: 'John Doe' },
		{ _id: 3, name: 'Jane Doe' }
	];

acmeServices.factory('Patient', function($http) {
	return {
		query: function() {
			return $http.get('/api/patients')
				.then(function(result) {
					return result.data;
				}, function(reason) {
					return [];
				});
		},
		find: function(id) {
			return $http.get('/api/patients/' + id)
				.then(function(result) {
					return result.data;
				}, function(reason) {
					return [];
				});
		},
		create: function(patient, callback) {
			return $http.post('/api/patients', requirement)
				.success(function() {
					if (callback !== undefined) {
						callback();
					}
				});
		},
	};
});

acmeServices.factory('Reading', function($http) {
	return {
		query: function(patientId) {
			return $http.get('/api/patients/' + patientId + '/readings')
				.then(function(result) {
					return result.data;
				}, function(reason) {
					return [];
				});
		},
		post: function(id, reading) {
		}
	};
});