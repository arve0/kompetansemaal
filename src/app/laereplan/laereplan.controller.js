(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('LaereplanController', LaereplanController);

  /** @ngInject */
  function LaereplanController($stateParams, udir) {
    var vm = this;  // view model

    vm.params = $stateParams;
    vm.data = udir.getREST(vm.params.id).then(function(data){
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

  }
})();
