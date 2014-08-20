var acmeDirectives = angular.module('acmeDirectives', []);

acmeDirectives.directive('bloodPressure', function() {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function(scope, element, attrs, ctrl) {
				
				ctrl.$parsers.unshift(function(viewValue) {
					var regex = /\s*(\d+)\s*\/\s*(\d+)/;

					var match = regex.exec(viewValue);
					if (match !== null) {
						ctrl.$setValidity('bloodPressure', true);
						ctrl.$modelValue.blood_pressure_sys = match[1];
						ctrl.$modelValue.blood_pressure_dia = match[2];
						return ctrl.$modelValue;
					}
					ctrl.$setValidity('bloodPressure', false);
					return ctrl.$modelValue;
				});

				ctrl.$formatters.unshift(function(modelValue) {
					if ('blood_pressure_sys' in modelValue && 'blood_pressure_dia' in modelValue) {
						return "" + modelValue.blood_pressure_sys + "/" + modelValue.blood_pressure_dia;
					}
					return "";
				});
			}
		};
	});

acmeDirectives.directive('c3Chart', function() {
	return {
		restrict: 'C',
		transclude: true,
		scope: {
			ngModel: '=',
			onSelected: '&'
		},
		link: function (scope, element, attrs) {
			var data = scope.ngModel;

			var getJsonAttribute = function(attribute) {
				try {
					return JSON.parse(attribute);
				} catch(err) {
					return null;
				}
			}

			scope.$watchCollection('ngModel', function() {
				data = scope.ngModel;
				drawChart();
			});

			var regions = getJsonAttribute(attrs.regions) || [];
			var property = getJsonAttribute(attrs.property) || [attrs.property];
			var yAxisMin = parseFloat(attrs.yAxisMin);
			var yAxisMax = parseFloat(attrs.yAxisMax);
			var chartType = attrs.type || 'spline';
			
			var drawChart = function() {
				c3.generate({
					bindto: element[0],
					data: {
						x_format: '%Y-%m-%dT%H:%M:%S.%LZ',
						json: data,
						keys: {
							x: 'timestamp',
							value: property
						},
						selection: {
							enabled: false
						},
						onxgridfocus: function(item) {
							// hack for all charts to show same focus line
							var thisFocusLine = $(element[0]).find('line.c3-xgrid-focus');
							var x1 = thisFocusLine.attr('x1');
							var x2 = thisFocusLine.attr('x2');
							$('line.c3-xgrid-focus').attr('x1', x1).attr('x2', x2).css('visibility', 'visible');
							
							if (scope.onSelected) {
								scope.onSelected({data: data[item.index]});
							}
						},
						onhidexgridfocus: function() {
							$('line.c3-xgrid-focus').css('visibility', 'hidden');
							
							if (scope.onSelected) {
								scope.onSelected();
							}							
						},
						color: function (color, d) {
							return d.value > 100 ? d3.rgb("#ff0000") : color;
						}
					},
					axis: {
						x: {
							type: 'timeseries',
							show: false
						},
						y: {
							show: false,
							min: yAxisMin,
							max: yAxisMax,
							padding: 1
						}
					},
					regions: regions,
					legend: {
						show: false
					},
					tooltip: {
						contents: function() {
							// We don't want to disable the tooltip because we then don't get the focus lines.
							// So, create a dummy tooltip.
							return "<span></span>";
						}
					}
				});
			};
		}
	};
});
