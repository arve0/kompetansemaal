(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('KompetansemaalController', KompetansemaalController);

  /** @ngInject */
  function KompetansemaalController($stateParams, udir) {
    var km = this;  // view model

    km.params = $stateParams;
    km.data = udir.getREST(km.params.id).then(function(data){
      km.data = data;
    });

  }
  
})();
