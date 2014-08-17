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
							controller: 'PatientListCtrl'
						}).
						when('/patients/:patientId', {
							templateUrl: 'app/views/detail.html',
							controller: 'PatientDetailCtrl'
						}).
						otherwise({
							redirectTo: '/patients'
						});
				}]);
