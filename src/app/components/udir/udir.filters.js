(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .filter('tittelOrKode', function() {
      return function(array, searchTerm) {
        if (!angular.isArray(array)) return array;

        searchTerm = angular.lowercase(searchTerm);

        return array.filter(compare);

        function compare(val) {
          var kode = angular.lowercase(val.Kode);
          var tittel = angular.lowercase(val.Tittel);
          return kode.search(searchTerm) !== -1 ||
                 tittel.search(searchTerm) !== -1;
        }
    };
  });

})();
