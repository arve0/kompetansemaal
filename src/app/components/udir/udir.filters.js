(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .filter('isEqual', function(){return isEqual;})
    .filter('isNotEqual', function(){return isNotEqual;})
    .filter('pickLanguage', function(){return pickLanguage;});

  function pickLanguage(arr, lang){
    if (!angular.isArray(arr)) { return arr; }

    var prefix = 'http://data.udir.no/kl06/'

    for (var obj of arr) {
      if (prefix + lang === obj.spraak) {
        return obj.verdi;
      }
    }
    return arr[0].verdi;
  }


  /**
   * check if values in two array of objects is equal
   * e.g.: {verdi: 'Biologi 1', noekkel: '..nob'} and
   *       {verdi: 'Biologi 1', noekkel: 'default'} are equal
   * @param {arrays of objects} arrays - two arrays with {verdi: .., noekkel: ..} objects
   * @param {string} language - which language to compare
   */
  function isEqual(arrays, language) {
    var val1 = pickLanguage(arrays[0], language);
    var val2 = pickLanguage(arrays[1], language);
    return (val1 === val2);
  }

  function isNotEqual(arrays, language){
    return !isEqual(arrays, language);
  }

})();
