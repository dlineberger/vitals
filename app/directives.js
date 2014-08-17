var acmeDirectives = angular.module('acmeDirectives', []);

acmeDirectives.directive('statChart', function() {
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
			
			var regions = getJsonAttribute(attrs.regions) || [];
			var property = getJsonAttribute(attrs.property) || [attrs.property];
			var yAxisMin = parseFloat(attrs.yAxisMin);
			var yAxisMax = parseFloat(attrs.yAxisMax);
			var chartType = attrs.type || 'spline';

			c3.generate({
				bindto: element[0],
				data: {
					json: data,
					type: chartType,
					keys: {
						value: property
					},
					selection: {
						enabled: true,
						multiple: false,
					},
					onselected: function(item) {
						console.log("Selected!");
						console.log();
						if (scope.onSelected) {
							scope.onSelected({data: data[item.index]});
						}
					}
				},
				axis: {
					x: {
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
				}
			});
		}
	};
});
