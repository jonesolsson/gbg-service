angular.module('states', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    url: "/home",
    templateUrl: 'templates/home.html',
    controller: 'bikeServiceController',
    resolve: {
    getCoords: function($q, Bike) {
       return Bike.getCoords();
     }
    }
  })

  .state('home.map', {
    url: "/map",
    templateUrl: "templates/home-map.html",
  })

  .state('home.near', {
    url: "/near",
    templateUrl: "templates/home-nearest.html"
  })

  .state('home.favourites', {
    url: '/favourites',
    templateUrl: 'templates/home-favourites.html'
  });

	$urlRouterProvider.otherwise("/home");

});
