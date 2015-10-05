/* global window:false */
(function(){
  'use strict';

  angular
    .module('kompetansemaal')
    .filter('prettyjson', function(){
      return function(obj){
        if (!angular.isObject) { return obj; }

        // create copy without properties starting with $ (angular internal props)
        var tmp = {}
        for (var p in obj) {
          if (p.search(/^\$/) == 0) {
            continue;
          }
          tmp[p] = obj[p];
        }

        return window.prettyjson.render(tmp, {noColor: true});
      };
    });
})();
