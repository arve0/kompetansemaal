(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('KodeController', KodeController);

  /** @ngInject */
  function KodeController($stateParams, udir) {
    var kode = this;  // view model

    kode.params = $stateParams;
    kode.data = udir.getREST(kode.params.id).then(function(data){
      kode.data = data;
    });

  }
})();
