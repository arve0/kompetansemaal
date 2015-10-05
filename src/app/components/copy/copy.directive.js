(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .directive('copy', copy);

  /** @ngInject */
  function copy(Clipboard) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/copy/copy.html',
      scope: {
          string: '='
      },
      link: link
    };

    function link(scope, element, attrs){
      var button = element[0].getElementsByTagName('button')[0];
      var clipboard = new Clipboard(button, {
        text: function() {
          return scope.string;
        }
      });

    }

    return directive;

  }

})();
