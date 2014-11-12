angular.module('bikeService', [])

.provider('Bike', function() {

  this.$get = ['$q', '$http', function($q, $http) {

    	//Public functions
      return({
        getBikes: getBikes,
        getCoords: getCoordinates,
        postFav: postFavourite
      });

      function getCoordinates() {

        var deferred = $q.defer();

        navigator.geolocation.getCurrentPosition(function(data) {
          deferred.resolve(data);
        });

        return deferred.promise;

      }

      function getBikes(lat, long, rad) {

        var deferred = $q.defer();

  			$http({
  				method: 'POST',
  				url: 'server/post_db.php',
          data: { lat: lat, long: long, rad: rad }
  			}).success(function(data) {
  				deferred.resolve(data);
  			}).error(function(msg, code) {
  				deferred.reject(msg);
  				console.log(code);
  			});

  			return deferred.promise;

      }

      function postFavourite(statId) {

        var deferred = $q.defer();

        $http({
          method: 'POST',
          url: 'server/post_favourite.php',
          data: { stationsId: statId }
        }).success(function(data) {
          deferred.resolve(data);
        }).error(function(msg, code) {
          deferred.reject(msg + ' ' + code);
        });

        return deferred.promise;

      }


  }];

});
