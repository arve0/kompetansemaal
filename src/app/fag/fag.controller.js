(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('FagController', FagController);

  /** @ngInject */
  function FagController($stateParams, udir) {
    var vm = this;  // view model

    vm.params = $stateParams;
    vm.data = udir.getREST(vm.params.id).then(function(data){
      vm.data = data;
    });

  }
})();
