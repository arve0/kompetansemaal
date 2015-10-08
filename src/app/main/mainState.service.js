(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .factory('mainState', mainState);

  function mainState() {
    var model = {
      search: {
        tooltip: false
      },
      laereplaner: [],
      fag: [],
      kompetansemaal: []
    }

    return model;
  }

})();
