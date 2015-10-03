(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('IdController', IdController);

  /** @ngInject */
  function IdController($stateParams, udir, Clipboard, $timeout) {
    var vm = this;  // view model

    // 'FYS01-01', 0, '1' -> 'FYS01-01-1a'
    vm.createID = function(omr, maal) {
      var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','æ','ø','å'];

      maal = parseInt(maal);
      if (maal < 0) { maal = 0; }
      if (maal > alphabet.length) { maal = alphabet.length - 1; }

      var lp = vm.params.id;

      return lp +'-'+ (omr+1) + alphabet[maal-1];
    };


    vm.params = $stateParams;
    udir.getREST(vm.params.id).then(function(data){
      vm.data = data;
    });

    var c = new Clipboard('button.copy', {
      target: function(trigger) {
        // return sibling in parent as target for copy action
        return trigger.parentElement.nextElementSibling;
      }
    }).on('success', function(e) {
      e.clearSelection();
      $timeout(function(){
        // TODO: fix popover toggle
        angular.element('.popover').remove();
      }, 1000);
    });

  }
})();
