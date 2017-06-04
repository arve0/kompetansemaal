(function() {
  var dpd = dpd || {};  // gracefully fail until we have deployd server live

  angular
    .module('kompetansemaal')
    .constant('dpd', dpd);

})();
