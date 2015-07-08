(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($stateParams, udir) {
    var vm = this;
    udir.getOdata('Læreplan').then(function(data){
      vm.lp = data.results;
    });

  }
})();
