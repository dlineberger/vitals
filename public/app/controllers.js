var acmeControllers = angular.module('acmeControllers', []);

acmeControllers.controller(
	'MainCtrl',
	['$scope', '$timeout',
	 function($scope, $timeout) {
		 var socket = io.connect('http://' + window.location.hostname);
		 socket.on('/patient', function(patient) {
			 console.log('received new patient');
			 $timeout(function() {
				 $scope.$broadcast('patient', patient);
			 });
		 });
		 socket.on('/reading', function(reading) {
			 console.log('received new reading');
			 $timeout(function() {
				 $scope.$broadcast("reading", reading);
			 });
		 });

		 socket.on('connect', function() {
			 $scope.socketId = this.socket.sessionid;
			 console.log("connect: " + this.socket.sessionid);
			 socket.emit('subscribe', {
				 topic: '/patient'
			 });
			 socket.emit('subscribe', {
				 topic: '/reading'
			 });
		 });
	 }]);

acmeControllers.controller(
	'PatientListCtrl',
	['$scope','patients',
	 function($scope, patients) {
		 $scope.patients = patients;

		 $scope.$on('patient', function(event, patient) {
			 $scope.patients.push(patient);
		 });
	 }]);

acmeControllers.controller(
	'ReadingEditCtrl',
	['$scope', '$routeParams',
	 function($scope, $routeParams) {

		 $scope.reset = function() {
			 $scope.reading = {};
		 };

		 $scope.isInvalid = function() {
			 return $scope.reading.pulse_bpm === undefined || $scope.reading.pulse_bpm < 0 ||
				 $scope.reading.temperature_degf === undefined || $scope.reading.temperature_degf < 0 ||
				 $scope.reading.blood_pressure_sys === undefined || $scope.reading.blood_pressure_sys < 0 ||
				 $scope.reading.blood_pressure_dia === undefined || $scope.reading.blood_pressure_dia < 0 ||
				 $scope.reading.respiratory_rate_rpm === undefined || $scope.reading.respiratory_rate_rpm < 0;
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
		 };

		 $scope.isInvalid = function() {
			 return $scope.patient.name.first === undefined ||
				 $scope.patient.name.last === undefined ||
				 $scope.patient.name.first.length === 0 || $scope.patient.name.last.length === 0;
		 };

		 $scope.addPatient = function(patient) {
			 Patient.create(patient, $scope.socketId, function(savedPatient) {
				 $scope.patients.push(savedPatient);
				 $scope.reset();
			 });
		 };

		 $scope.reset();
	 }]);


acmeControllers.controller(
	'PatientDetailCtrl',
	['$scope', '$routeParams', 'patient', 'readings', 'Reading',
	 function($scope, $routeParams, patient, readings, Reading) {
		 $scope.patient = patient;
		 $scope.allReadings = _.sortBy(readings, 'timestamp');

		 $scope.$on('reading', function(event, reading) {
			 if (reading.patient_id === $scope.patient._id) {
				 addReading(reading);
			 }
		 });

		 $scope.filterDays = null;

		 var addReading = function(reading) {
			 $scope.allReadings.push(reading);
			 $scope.selectedReading = reading;
			 filterReadings();
		 };

		 var filterReadings = function() {
			 var filterStartDate = new Date(0);
			 if ($scope.filterDays) {
				 var now = new Date();
				 filterStartDate = now.setDate(now.getDate() - $scope.filterDays);
			 }

			 $scope.readings = _.filter($scope.allReadings, function(reading) {
				 return Date.parse(reading.timestamp) > filterStartDate;
			 });

			 $scope.selectedReading = _.last($scope.readings);
		 };

		 $scope.setSelectedReading = function(data) {
			 $scope.$apply(function() {
				 if (data) {
					 $scope.selectedReading = data;
				 } else {
					 $scope.selectedReading = _.last($scope.readings);
				 }
			 });
		 };

		 $scope.$watch('filterDays', filterReadings);

		 $scope.postReading = function(reading) {
			 Reading.create($routeParams.patientId, reading, $scope.socketId, addReading);
		 };

		 filterReadings();

	 }]);
