(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
    };

    return directive;

  }

})();
