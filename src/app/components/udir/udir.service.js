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
      var R = $odataresource(baseUrl + 'odata/' + endpoint + '/:id', {},
                              { odata:
                                { cache: true,
                                  isArray: true,
                                  transformResponse: getResult
                                }
                              });

      R.find = function(field, query) {
        return R.odata()
                  .filter('Status', 'http://psi.udir.no/ontologi/status/publisert')
                  .filter(
                    new $odata.Func('substringof',
                      new $odata.Value(query.toLowerCase()),
                      new $odata.Func('tolower', field)
                    ), true )
                  .query();
      };

      return R;
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

  function getResult(data) {
    try {
      var res = angular.fromJson(data);
    } catch(e) {
      // not JSON
      return { error: {msg: 'Not JSON' + e},
               data: data};
    }

    // get array or object from result
    if ('d' in res) {
      if ('results' in res.d) {
        res = res.d.results;
      } else {
        res = res.d;
      }
    }
    return res;
  }

})();
