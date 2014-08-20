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

		 $scope.reset = function() {
			 $scope.reading = {};
		 }

		 $scope.isInvalid = function() {
			 return $scope.reading.pulse_bpm === undefined || $scope.reading.pulse_bpm < 0
				 || $scope.reading.temperature_degf === undefined || $scope.reading.temperature_degf < 0
			 	 || $scope.reading.blood_pressure_sys === undefined || $scope.reading.blood_pressure_sys < 0
			 	 || $scope.reading.blood_pressure_dia === undefined || $scope.reading.blood_pressure_dia < 0
			 	 || $scope.reading.respiratory_rate_rpm === undefined || $scope.reading.respiratory_rate_rpm < 0;
			 
		 }

		 $scope.addReading = function(reading) {
			 Reading.create($routeParams.patientId, reading, function(savedReading) {
				 $scope.readings.push(savedReading);
				 $scope.setSelectedReading();
				 $scope.reset();
			 });
		 };

		 $scope.reset();
	 }]);

acmeControllers.controller(
	'PatientEditCtrl',
	['$scope', '$routeParams', 'Patient',
	 function($scope, $routeParams, Patient) {

		 $scope.reset = function() {
			 $scope.patient = {
				 name: {
					 first: "",
					 last: ""
				 }
			 };
		 }

		 $scope.isInvalid = function() {
			 return $scope.patient.name.first === undefined ||
				 $scope.patient.name.last === undefined ||
				 $scope.patient.name.first.length === 0 || $scope.patient.name.last.length === 0;
		 }

		 $scope.addPatient = function(patient) {
			 Patient.create(patient, function(savedPatient) {
				 $scope.patients.push(savedPatient);
				 $scope.reset();
			 });
		 };

		 $scope.reset();
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
