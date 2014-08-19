'use strict';

var acmeControllers = angular.module('acmeControllers', []);

acmeControllers.controller(
	'PatientListCtrl',
	['$scope', '$http', 'Patient',
	 function($scope, $http, Patient) {
		 $scope.patients = Patient.all();
	 }]);

acmeControllers.controller(
	'PatientDetailCtrl',
	['$scope', '$routeParams', 'Patient', 'Reading',
	 function($scope, $routeParams, Patient, Reading) {
		 $scope.patient = Patient.query($routeParams.patientId);
		 $scope.readings = Reading.query($routeParams.patientId);
		 $scope.selectedReading = $scope.readings[0];

		 $scope.setSelectedReading = function(data) {
			 $scope.$apply(function() {
				 $scope.selectedReading = data;
			 });
		 }

		 $scope.addReading = function() {
			 console.log("adding reading.");
		 }
	 }]);
