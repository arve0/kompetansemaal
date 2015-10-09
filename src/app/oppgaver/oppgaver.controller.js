(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('OppgaverController', OppgaverController);

  /** @ngInject */
  function OppgaverController(dpd, $scope, $log) {
    var oppg = this;
    dpd.oppgaver.get(function(data, err) {
      if (err) {
        $log.error(err);
      }
      oppg.oppgaver = data;
      $scope.$apply();
    });
  }

})();
