(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('FagController', FagController);

  /** @ngInject */
  function FagController($stateParams, udir, mainState) {
    var fag = this;  // view model
    fag.state = mainState;  // access to language

    fag.params = $stateParams;
    fag.data = udir.getREST(fag.params.id).then(function(data){
      fag.data = data;
    });

  }
})();
