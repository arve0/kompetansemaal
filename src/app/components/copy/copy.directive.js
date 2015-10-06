(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .directive('copy', copyDirective);

  /** @ngInject */
  function copyDirective($tooltip, $timeout) {
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

      // better way of doing this?
      var copiedTooltip = $tooltip(element, {
        title: 'Kopiert!',
        placement: 'top',
        trigger: 'manual'
      });

      var failedTooltip = $tooltip(element, {
        title: failMsg,
        placement: 'top',
        trigger: 'manual'
      });

      scope.copied = function() {
        copiedTooltip.show();
        $timeout(copiedTooltip.hide, 1000);
      }

      scope.error = function(err) {
        // select text when failing to copy text
        element[0].getElementsByTagName('input')[0].select();
        failedTooltip.show();
        $timeout(failedTooltip.hide, 2000);
      }

    } // link end

    return directive;

  } // copyDirective end


})();
