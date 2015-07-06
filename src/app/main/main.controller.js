(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($stateParams, udir) {
    var vm = this;

    vm.udir = udir;
    udir.getOdata('Læreplan').then(function(data){
      vm.lp = data;
    });

  }
})();
