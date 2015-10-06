(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .directive('copy', copyDirective);

  /** @ngInject */
  function copyDirective($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/copy/copy.html',
      scope: {
          text: '='
      },
      link: link
    };

    function link(scope, element, attrs){
      // simple browser detection
      var failMsg;
      if(/iPhone|iPad/i.test(navigator.userAgent)) {
        failMsg = 'No copy support on iOS.';
      } else if (/Mac/i.test(navigator.userAgent)) {
        failMsg = 'Press ⌘-C to copy.';
      } else {
        failMsg = 'Press Ctrl-C to copy.';
      }

      scope.tooltip = {msg:'Kopiert!', show:false}
      scope.copied = function() {
        scope.tooltip.show = true;
        // inside link -> we need to apply changes
        scope.$apply();
        $timeout(hideTooltip, 1000);
      }

      scope.error = function(err) {
        // select text when failing to copy text
        element[0].getElementsByTagName('input')[0].select();
        scope.tooltip.msg = failMsg;
        scope.tooltip.show = true;
        scope.$apply();
        $timeout(hideTooltip, 2000);
      }

      function hideTooltip(){
        scope.tooltip.show = false;
      }

    } // link end

    return directive;

  } // copyDirective end


})();
