angular.module('bikeCtrl', [])

  .controller('bikeServiceController', ['$rootScope', '$scope', '$http', 'Bike', '$q', 'getCoords', 'GoogleMapApi'.ns(), 'Storage',
   function($rootScope, $scope, $http, Bike, $q, getCoords, GoogleMapApi, Storage) {

    //Set user in localStorage / User info
    Storage.setUser();
    $scope.user = {
      userId: Storage.getUserId()
    };

    //Object with coords data
    $scope.coords = {
      currentLat: getCoords.coords.latitude,
      currentLong: getCoords.coords.longitude
    };

    Bike.getBikes( /*$scope.coords.currentLat, $scope.coords.currentLong*/ 57.710570, 11.987056, 500).then(function(data) {
      $scope.stations = data;
    });

    //Get data from API to favouriteStations
    Bike.getFav($scope.user.userId).then(function(data) {
      $scope.favouriteStations = data;
    });

    //Save fav from nearest stations
    $scope.saveStation = function(StationId) {

      Bike.postFav(StationId, $scope.user.userId).then(function(data) {
        console.log(data);
      }).then(function() {

        //Get new data from API
          Bike.getFav($scope.user.userId).then(function(data) {
            $scope.favouriteStations = data;
          });
      });

    };
    
    //Delete favourite station
    $scope.deleteStation = function(stationsId) {

      Bike.deleteFav(stationsId, $scope.user.userId).then(function(data) {
        console.log(data);
      }).then(function() {

        //Delete data from scope
        angular.forEach($scope.favouriteStations, function(val, key) {
          if(stationsId === val.Id) {
            $scope.favouriteStations.splice(key, 1);
          }
        });

      });

    };

    //GOOGLE MAP
    Bike.getBikes($scope.coords.currentLat, $scope.coords.currentLong, 20000).then(function(data) {
      $scope.map = {
        center: { latitude: $scope.coords.currentLat, longitude: $scope.coords.currentLong },
        zoom: 13
      };

      $scope.map.markers = [];
      $scope.map.bounds = {};
      var i = 0;

      angular.forEach(data, function(val, key) {
        i++;

        if(!val.AvailableBikeStands)
          val.AvailableBikeStands = 0;

        if(!val.AvailableBikes)
          val.AvailableBikes = 0;

        $scope.map.markers.push({
          showWindow: false,
          id: i,
          latitude: val.Lat,
          longitude: val.Long,
          name: val.Name,
          avalStands: val.AvailableBikeStands,
          avalBikes: val.AvailableBikes,
        });

      });

    });


  }]);
