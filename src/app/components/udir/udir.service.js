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

      /**
       * Search for query {field: term}. Get all fields or fields specified.
       * @argument {Object} query - {field: term, field2: term2} will search for term in field
       *                            OR term2 in field2.
       * @return odata resource ready for query
       */
      R.search = function(queries) {
        var predicates = [];

        // create list of predicates
        for (var field in queries) {
          // odata property and value in lower case
          var property = new $odata.Func('tolower', field);
          var value = new $odata.Value(queries[field].toLowerCase());

          // find substring in given property
          var predicate = new $odata.Predicate(
            new $odata.Func('substringof', value, property),
            true);
          predicates.push(predicate)
        }

        var query = $odata.Predicate.or(predicates);
        return R.odata()
                .filter('Status', 'http://psi.udir.no/ontologi/status/publisert')
                .filter(query);
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
