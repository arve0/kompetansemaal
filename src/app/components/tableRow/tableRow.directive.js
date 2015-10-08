(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .directive('tableRow', tableRowDirective);

  /** @ngInject */
  function tableRowDirective() {
    var directive = {
      restrict: 'A',
      templateUrl: 'app/components/tableRow/tableRow.html',
      scope: {
        header: '@th',
        data: '=td'
      }
    };

    return directive;

  }


})();
