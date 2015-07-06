(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('IdController', IdController);

  /** @ngInject */
  function IdController($stateParams, udir) {
    var vm = this;
    vm.params = $stateParams;
    udir.getREST(vm.params.id).then(function(data){
      vm.data = data;
    });

  }
})();
