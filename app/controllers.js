'use strict';

var acmeControllers = angular.module('acmeControllers', []);

acmeControllers.controller('PatientListCtrl', ['$scope', '$http',
											   function($scope, $http) {
												   $scope.hello = "world";
											   }]);

acmeControllers.controller(
	'PatientDetailCtrl',
	['$scope', '$routeParams', 'Patient',
	 function($scope, $routeParams, Patient) {
		 $scope.patient = Patient.query($routeParams.patientId);
		 $scope.selectedReading = $scope.patient.readings[0];

		 $scope.setSelectedReading = function(data) {
			 $scope.$apply(function() {
				 $scope.selectedReading = data;
			 });
		 }
	 }]);
