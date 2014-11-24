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

    //Get nearby stations
    Bike.getBikes( $scope.coords.currentLat, $scope.coords.currentLong, 1300 ).then(function(data) {
      $scope.stations = data;
    });

    //Get all stations
    Bike.getBikes( $scope.coords.currentLat, $scope.coords.currentLong, 100000 ).then(function(data) {
      $scope.allStaions = data;
    });

    //Get data from API to favouriteStations
    Bike.getFav($scope.user.userId).then(function(data) {
      $scope.favouriteStations = data;
      if(data.length === 0)
        $('.empty-saved-text').removeClass('hide');
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

   //Hide nearest map
   $scope.hideMap = function() {
     $('.nearby-map').addClass('hide');
   };

   GoogleMapApi.then(function(maps) {

      Bike.setDirMap($scope.coords.currentLat, $scope.coords.currentLong).then(function(data) {

        //The actual map
        $scope.mapp = data;

        var mapMarkers = [],
            directionsDisplay = new maps.DirectionsRenderer({ suppressMarkers : true });

        $scope.showDirection = function(lat, long) {

          directionsDisplay.setMap(null);

          $('.nearby-map').removeClass('hide');
          maps.event.trigger($scope.mapp.control.getGMap(), 'resize');

          $scope.calcRoute = function () {

            //Clear the markers before setting the new ones
            for(var i = 0; i <= mapMarkers.length; i++) {
                angular.forEach(mapMarkers[i], function(val, key) {
                  val.setMap(null);
                });
            }

            var interval = setInterval(function() {
              if($scope.mapp.control) {
                directionsDisplay.setMap($scope.mapp.control.getGMap());
                clearInterval(interval);
              }
            }, 1000);

            var directionsService = new maps.DirectionsService(),
                latLngOrigin = $scope.coords.currentLat + ', ' + $scope.coords.currentLong,
                latLngDestination = lat + ', ' + long;

            var request = {
              origin: latLngOrigin,
              destination: latLngDestination,
              travelMode: google.maps.TravelMode.WALKING
            };

            //Start and finish markers
            var icons = {
              start: new maps.MarkerImage('style/icon1.png'),
              end: new maps.MarkerImage('style/bike.png')
            };

            //Execute the directin operation
            directionsService.route(request, function(response, status) {

              if (status == maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);

                var marker = [
                              new maps.Marker({
                                position: response.routes[ 0 ].legs[ 0 ].start_location,
                                map: $scope.mapp.control.getGMap(),
                                icon: icons.start
                              }),
                              new maps.Marker({
                                position: response.routes[ 0 ].legs[ 0 ].end_location,
                                map: $scope.mapp.control.getGMap(),
                                icon: icons.end
                              })
                            ];

                mapMarkers.push(marker);

              } else {
                console.log(response);
              }

            });

            return;

          };

          $scope.calcRoute();

        };

       });

    });

    //GOOGLE MAP for "maps page"
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
          icon: 'style/bike.png'
        });

      });

      //Current position marker
      $scope.marker = {
          id: 999,
          coords: {
            latitude: $scope.coords.currentLat,
            longitude: $scope.coords.currentLong
          }
        };

      });

  }]);
