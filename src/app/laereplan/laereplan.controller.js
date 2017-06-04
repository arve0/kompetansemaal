(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('LaereplanController', LaereplanController)
    .filter('kmFilter', function () { return kmFilter });

  /** @ngInject */
  function LaereplanController($stateParams, udir) {
    var lp = this;  // controller as lp

    lp.params = $stateParams;
    lp.data = udir.getREST(lp.params.id).then(function(data){
      lp.data = data;
    });

  }

  function kmFilter (arr, kode) {
    return arr.filter(function (km) {
      return km['tilhoererhovedomraade'].kode === kode
    })
  }


})();
