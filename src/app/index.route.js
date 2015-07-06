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
      .state('id', {
        url: '/:id',
        templateUrl: 'app/id/id.html',
        controller: 'IdController',
        controllerAs: 'id'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
