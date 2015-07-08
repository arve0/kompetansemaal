(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .filter('tittelOrKode', function() {
      return function(arr, searchTerm) {
        if (!angular.isArray(arr)) {
          return arr;
        }

        searchTerm = angular.lowercase(searchTerm);

        return arr.filter(compare);

        function compare(val) {
          var kode = angular.lowercase(val.Kode);
          var tittel = angular.lowercase(val.Tittel);
          return kode.search(searchTerm) !== -1 ||
                 tittel.search(searchTerm) !== -1;
        }
    };
  });

})();
