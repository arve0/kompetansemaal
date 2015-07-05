(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .factory('udir', udir);

  /** @ngInject */
  function udir($log, $http) {
    var baseUrl = 'http://data.udir.no/kl06/odata/';
    var parameters = {
      $callback: 'JSON_CALLBACK',
      $format: 'json',
      $filter: "(Status eq 'http://psi.udir.no/ontologi/status/publisert')",
    };

    var service = {
      baseUrl: baseUrl,
      parameters: parameters,
      getAll: getAll
    };

    return service;

    function getAll(endpoint) {

      return $http.jsonp(baseUrl + endpoint, {
          params: parameters
        })
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



