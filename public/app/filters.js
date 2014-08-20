var acmeFilters = angular.module('acmeFilters', []);

acmeFilters.filter('bloodPressure', function() {
  return function(input) {
      return "" + input.blood_pressure_sys + "/" + input.blood_pressure_dia;
  };
});
