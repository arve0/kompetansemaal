(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('IdController', IdController);

  /** @ngInject */
  function IdController($stateParams, udir, Clipboard, $timeout) {
    var vm = this;  // view model

    vm.params = $stateParams;
    udir.getREST(vm.params.id).then(function(data){
      vm.data = data;
    });


    // 'FYS01-01', 0, '1' -> 'FYS01-01-1a'
    vm.createID = function(kms, omr, maal) {
      var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Æ','Ø','Å'];

      maal = parseInt(maal);
      if (maal < 0) { maal = 0; }
      if (maal > alphabet.length) { maal = alphabet.length - 1; }

      var fag = kms['etter-fag'][0].kode;

      return fag +'-'+ (omr+1) + alphabet[maal-1];
    };


    var clipboard = new Clipboard('button.copy', {
      target: function(trigger) {
        // return sibling in parent as target for copy action
        return trigger.parentElement.nextElementSibling;
      }
    });

    clipboard.on('success', function(e) {
      e.clearSelection();

      // close popover
      $timeout(function(){
        // get child scopes https://github.com/angular-ui/bootstrap/blob/81a38d72613d82bb4d8b5ab44e3bde704a59b056/src/popover/test/popover.spec.js#L153
        var popoverScope = angular.element(e.trigger).scope().$$childTail;
        popoverScope.isOpen = false;
        // popover is next element, remove it
        e.trigger.nextElementSibling.remove();
      }, 1000);
    });

  }
})();
