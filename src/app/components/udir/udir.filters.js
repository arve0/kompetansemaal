(function() {
  'use strict';

angular
.module('kompetansemaal')
.filter('tittelOrKode', function() {
  return function(arr, searchTerm) {
    // filter array of objects by obj.Kode and obj.Tittel
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
}).filter('pickLanguage', function(){
  return function(arr, lang){
    // not array
    if (!angular.isArray(arr)) { return arr; }

    // no elements
    var l = arr.length;
    if (l===0) { return arr; }

    // find obj with obj.noekkel = ...lang
    for (var i=0; i < l; i++) {
      var o = arr[i];
      if (o.noekkel.search(lang + "$") !== -1) {
        return o.verdi;
      }
    }
    return arr[0].verdi;  // not found, choose default
  };
});

})();
