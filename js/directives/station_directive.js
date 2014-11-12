angular.module('stationsDirective', [])

.directive('availableBikes', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if(!scope.station.AvailableBikes) {
        scope.AvailableBikes = scope.station.BikeStands - scope.station.AvailableBikeStands;
      }
      else {
        scope.AvailableBikes = scope.station.AvailableBikes;
      }        
    }
  };

});
