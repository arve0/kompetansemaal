(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($stateParams, udir) {
    var vm = this;  // view model
    udir.getOdata('Læreplan').then(function(data){
      vm.lp = data.results;
    });

  }
})();
