var acmeApp = angular.module('acmeApp', [
	'ngRoute',
	'acmeControllers',
	'acmeServices',
	'acmeDirectives'
]);

acmeApp.config(['$routeProvider',
				function($routeProvider) {
					$routeProvider.
						when('/patients', {
							templateUrl: 'app/views/list.html',
							controller: 'PatientListCtrl',
							resolve: {
								patients: function(Patient) {
									return Patient.query();
								}
							}
						}).
						when('/patients/:patientId', {
							templateUrl: 'app/views/detail.html',
							controller: 'PatientDetailCtrl',
							resolve: {
								patient: function(Patient, $route) {
									return Patient.find($route.current.params.patientId);
								},
								readings: function(Reading, $route) {
									return Reading.query($route.current.params.patientId);
								}
							}
						}).
						otherwise({
							redirectTo: '/patients'
						});
				}]);
