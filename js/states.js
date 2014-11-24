angular.module('states', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('index', {
    url: '/',
    templateUrl: 'templates/loader.html',
    controller: function($location) {
      $location.path('/home/info');
    }
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'bikeServiceController',
    resolve: {
    getCoords: function($q, Bike) {
       return Bike.getCoords();
     }
    }
  })

  .state('home.info', {
    url: '/info',
    templateUrl: 'templates/home-info.html'
  })

  .state('home.map', {
    url: "/map",
    templateUrl: "templates/home-map.html",
  })

  .state('home.near', {
    url: '/near',
    templateUrl: 'templates/home-nearest.html'
  })

  .state('home.favourites', {
    url: '/favourites',
    templateUrl: 'templates/home-favourites.html'
  });

	$urlRouterProvider.otherwise('/');

});
