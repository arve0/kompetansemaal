(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
