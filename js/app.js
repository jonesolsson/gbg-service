angular.module('gbgService', [
  'bikeCtrl',
  'google-maps'.ns(),
  'ui.router',
  'states',
  'bikeService',
  'stationsDirective',
  'LocalStorageModule',
  'angularUUID2',
  'filters'
])

 .config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
      GoogleMapApi.configure({
          key: 'AIzaSyD2h2c1XbwK4vA_olDBKr8rLGozjsYWfn4',
          v: '3.17'
      });
  }]);
