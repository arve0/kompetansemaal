(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
