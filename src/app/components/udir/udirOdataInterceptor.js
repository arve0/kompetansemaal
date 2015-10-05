(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .factory('udirOdataInterceptor', udirOdataInterceptor);

/** @ngInject */
function udirOdataInterceptor() {
  return {
    response: function(response) {
      if (response.config.url.search('http://data.udir.no/kl06/odata') === 0
          && angular.isObject(response.data)
          && 'd' in response.data) {
        if ('results' in response.data.d) {
          response.data = response.data.d.results;
        } else {
          response.data = response.data.d;
        }
      }
      return response;
    }
  };
}

})();
