(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .factory('udir', udir);

  /** @ngInject */
  function udir($log, $http) {
    var baseUrl = 'http://data.udir.no/kl06/odata/';
    var parameters = '?$format=json&$callback=JSON_CALLBACK';

    var service = {
      baseUrl: baseUrl,
      parameters: parameters,
      getAll: getAll
    };

    return service;

    function getAll(endpoint) {

      return $http.jsonp(baseUrl + endpoint + parameters)
        .then(getComplete)
        .catch(getFailed);

      function getComplete(response) {
        return response.data.d;
      }

      function getFailed(error) {
        $log.error('XHR Failed for udir.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();



