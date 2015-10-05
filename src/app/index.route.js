(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('laereplan', {
        url: '/laereplan/:id',
        templateUrl: 'app/laereplan/laereplan.html',
        controller: 'LaereplanController',
        controllerAs: 'lp'
      })
      .state('fag', {
        url: '/fag/:id',
        templateUrl: 'app/fag/fag.html',
        controller: 'FagController',
        controllerAs: 'fag'
      })
      .state('kompetansemaal', {
        url: '/kompetansemaal/:id',
        templateUrl: 'app/kompetansemaal/kompetansemaal.html',
        controller: 'KompetansemaalController',
        controllerAs: 'km'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
