(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .factory('udir', udir);

  /** @ngInject */
  function udir($log, $http, $odata, $odataresource) {
    var baseUrl = 'http://data.udir.no/kl06/';

    var service = {
      baseUrl: baseUrl,
      getREST: getREST,
      odataResource: odataResource
    };

    return service;

    function odataResource(endpoint) {
      var Resource = $odataresource(baseUrl + 'odata/' + endpoint + '/:id');

      Resource.find = function(field, query) {
        return Resource.odata()
                  .filter('Status', 'http://psi.udir.no/ontologi/status/publisert')
                  .filter(
                    new $odata.Func('substringof',
                      new $odata.Value(query.toLowerCase()),
                      new $odata.Func('tolower', field)
                    ), true )
                  .query();
      };

      return Resource;
    }

    function getREST(endpoint) {
      return $http.get(baseUrl + endpoint, {
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
