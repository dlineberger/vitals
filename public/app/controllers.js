'use strict';

var acmeControllers = angular.module('acmeControllers', []);

acmeControllers.controller(
	'PatientListCtrl',
	['$scope','patients',
	 function($scope, patients) {
		 $scope.patients = patients;
	 }]);

acmeControllers.controller(
	'PatientDetailCtrl',
	['$scope', '$routeParams', 'patient', 'readings',
	 function($scope, $routeParams, patient, readings) {
		 $scope.patient = patient;
		 $scope.allReadings = _.sortBy(readings, 'timestamp');

		 $scope.setSelectedReading = function(data) {
			 $scope.$apply(function() {
				 $scope.selectedReading = data;
			 });
		 };

		 $scope.setDateFilterDays = function(days) {
			 var filterStartDate = new Date(0);
			 if (days) {
				 var now = new Date();
				 filterStartDate = now.setDate(now.getDate() - days);
			 }

			 $scope.readings = _.filter($scope.allReadings, function(reading) {
				 return Date.parse(reading.timestamp) > filterStartDate;
			 });
		 };

		 $scope.addReading = function(reading) {
			 console.log("adding reading.");
			 //Reading.post($routeParams.patientId, reading);
		 };

		 $scope.setDateFilterDays();

		 $scope.selectedReading = _.last($scope.readings);
	 }]);
