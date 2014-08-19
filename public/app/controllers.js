'use strict';

var acmeControllers = angular.module('acmeControllers', []);

acmeControllers.controller(
	'PatientListCtrl',
	['$scope','patients',
	 function($scope, patients) {
		 $scope.patients = patients;
	 }]);

acmeControllers.controller(
	'ReadingEditCtrl',
	['$scope', '$routeParams', 'Reading',
	 function($scope, $routeParams, Reading) {
		 $scope.reading = {};

		 $scope.addReading = function(reading) {
			 Reading.create($routeParams.patientId, reading, function(savedReading) {
				 $scope.readings.push(savedReading);
			 });
		 };
	 }]);

acmeControllers.controller(
	'PatientEditCtrl',
	['$scope', '$routeParams', 'Patient',
	 function($scope, $routeParams, Patient) {
		 $scope.patient = { name: {} };

		 $scope.addPatient = function(patient) {
			 Patient.create(patient, function(savedPatient) {
				 $scope.patients.push(savedPatient);
			 });
		 };
	 }]);


acmeControllers.controller(
	'PatientDetailCtrl',
	['$scope', '$routeParams', 'patient', 'readings',
	 function($scope, $routeParams, patient, readings) {
		 $scope.patient = patient;
		 $scope.allReadings = _.sortBy(readings, 'timestamp');

		 $scope.setSelectedReading = function(data) {
			 $scope.$apply(function() {
				 if (data) {
					 $scope.selectedReading = data;
				 } else {
					 $scope.selectedReading = _.last($scope.readings);	 
				 }
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



		 $scope.setDateFilterDays();

		 $scope.selectedReading = _.last($scope.readings);
	 }]);
