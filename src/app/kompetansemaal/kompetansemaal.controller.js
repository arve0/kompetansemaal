(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('KompetansemaalController', KompetansemaalController);

  /** @ngInject */
  function KompetansemaalController($stateParams, udir) {
    var vm = this;  // view model

    vm.params = $stateParams;
    vm.data = udir.getREST(vm.params.id).then(function(data){
      vm.data = data;
    });

  }
})();
