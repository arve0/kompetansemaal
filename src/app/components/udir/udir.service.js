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
                                  transformResponse: transformOdata
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
          predicates.push(predicate);
        }

        var query = $odata.Predicate.or(predicates);
        return R.odata()
                .filter('Status', 'http://data.udir.no/kl06/status_publisert')
                .filter(query)
                .transformUrl(function(url){
                  return url + '&lang=nob'
                });
;
      };

      return R;
    }

    function getREST(endpoint) {
      return $http.get(baseUrl + endpoint + '?lang=nob', {cache: true})
        .then(function(response){
          var data = replaceKeyValueArrays(response.data);
          data = rmDashesFromProperties(data);
          return data;
        })
        .catch(function(error){
          $log.error('XHR Failed for udir.\n' + angular.toJson(error, true));
        });
    }

    /**
     * Replaces instaces of [{noekkel: '', verdi: ''}] in object.
     */
    function replaceKeyValueArrays(obj) {
      for (var key in obj) {
        if (isKeyValueArray(obj[key])) {
          obj[key] = arrayToObject(obj[key]);
        } else if (angular.isObject(obj[key])) {
          obj[key] = replaceKeyValueArrays(obj[key]);
        }
      }
      return obj;
    }

    function rmDashesFromProperties(obj) {
      for (var key in obj) {
        var newKey = removeDashes(key);
        if (newKey !== key) {
          obj[newKey] = obj[key];
          delete obj[key];
        }
        if (angular.isObject(obj[newKey])) {
          rmDashesFromProperties(obj[newKey]);
        }
      }
      return obj;
    }

    function removeDashes(str) {
      var dashes = new RegExp('\-', 'gi');
      return str.replace(dashes, '');
    }

    /**
     * Checks if array is [{noekkel: '', verdi:''}] array.
     * NOTE: Assumes properties of first object to be equal to properties in all other objects.
     */
    function isKeyValueArray(arr) {
      return (angular.isArray(arr) &&
              arr.length !== 0 &&
              angular.isObject(arr[0]) &&
              Object.keys(arr[0]).length === 2 &&
              'noekkel' in arr[0] &&
              'verdi' in arr[0]);
    }

    /**
     * Transforms [{noekkel: 'http://psi.oasis-open.org/iso/639/#eng', verdi: 'Biology 1'},
     *             {noekkel: 'http://psi.oasis-open.org/iso/639/#nob', verdi: 'Biologi 1'}]
     * to
     *            {'eng': 'Biology 1',
     *             'nob': 'Biologi 1'}
     */
    function arrayToObject(arr){
      var keyPrefix = 'http://psi.oasis-open.org/iso/639/#';
      var obj = {};
      for (var i=0, l=arr.length; i < l; ++i){
        // error handling
        if (!('noekkel' in arr[i]) || !('verdi' in arr[i])) {
          $log.error('Expected "noekkel" and "verdi" keys on object.');
          $log.error(arr[i]);
          continue;
        } else if (Object.keys(arr[i]).length > 2) {
          $log.warn('Got object with more than two keys.');
          $log.warn(arr[i]);
        }
        var key = arr[i].noekkel;
        if (key.search(keyPrefix) === 0) {
          key = key.substring(keyPrefix.length, key.length);
        }
        if (key in obj) {
          $log.warn('Several instances of '+ arr[i].noekkel);
        }
        obj[key] = arr[i].verdi;
      }  // for
      return obj;
    }  // arrayToObject

    /**
     * Get response.d.results or response.d from odata searches.
     */
    function transformOdata(data) {
      var res;
      try {
        res = angular.fromJson(data);
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

  }

})();
