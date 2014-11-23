angular.module('stationsDirective', [])

.directive('availableBikes', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      //Bikes
      if(!scope.station.AvailableBikes) {
        scope.AvailableBikes = scope.station.BikeStands - scope.station.AvailableBikeStands;
      }
      else {
        scope.AvailableBikes = scope.station.AvailableBikes;
      }

    }
  };

})

.directive('scrollTopMap', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('click', function(e) {
        e.preventDefault();

        $("html, body").animate({
          scrollTop: 0
        }, 600);

      });
    }
  };

})

.directive('scrollTop', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
      });

    }
  };

})

.directive('mapWrap', function() {

    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        var winHeight = $(window).height(),
            menuHeight = $('.menu-wrap').height(),
            showListHeigth = $('.show-list').height(),
            favHeading = $('.near-heading').height(),
            mapHeight;

            if(attrs.class == 'col-xs-12 nearby-map hide')
              mapHeight = winHeight - menuHeight - favHeading - 15;
            else
              mapHeight = winHeight - menuHeight - showListHeigth - 10;

        $(element).css('height', mapHeight);
        $(element).css('padding-bottom', '15px');

      }
    };

})

.directive('saved', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      element.on('click', function() {
        $('.saved-station-marker').addClass('show');

        setTimeout(function () {
          $('.saved-station-marker').removeClass('show');
        }, 3000);

      });

    }
  };

})

.directive('deleted', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      element.on('click', function() {
        $('.delete-station-marker').addClass('show');

        setTimeout(function () {
          $('.delete-station-marker').removeClass('show');
        }, 3000);

      });

    }
  };

})

.directive('easterEgg', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      setTimeout(function() {

        if(scope.$parent.stations === undefined || scope.$parent.stations.length === 0) {
          $(element).removeClass('hide');
        }

      }, 500);

    }
  };

});
