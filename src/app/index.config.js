(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // intercept odata traffic and return obj.d.results
    $httpProvider.interceptors.push('udirOdataInterceptor');

  }

})();
