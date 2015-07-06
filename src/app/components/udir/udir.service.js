(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .factory('udir', udir);

  /** @ngInject */
  function udir($log, $http) {
    var baseUrl = 'http://data.udir.no/kl06/';

    var service = {
      baseUrl: baseUrl,
      getOdata: getOdata,
      getREST: getREST
    };

    return service;

    function getOdata(endpoint) {
      var params = {
        $callback: 'JSON_CALLBACK',
        $format: 'json',
        $filter: "(Status eq 'http://psi.udir.no/ontologi/status/publisert')",
      };

      return $http.jsonp(baseUrl + 'odata/' + endpoint, {
          params: params,
          cache: true,
        })
        .then(getComplete)
        .catch(getFailed);

      function getComplete(response) {
        return response.data.d;
      }

      function getFailed(error) {
        $log.error('XHR Failed for udir.\n' + angular.toJson(error, true));
      }
    }

    function getREST(endpoint) {
      var corsproxy = 'http://crossorigin.me/';

      return $http.get(corsproxy + baseUrl + endpoint, {
          params: {
            lang: 'nob'
          },
          cache: true,
        })
        .then(getComplete)
        .catch(getFailed);

      function getComplete(response) {
        return response.data;
      }

      function getFailed(error) {
        $log.error('XHR Failed for udir.\n' + angular.toJson(error, true));
      }
    }
  }
})();



