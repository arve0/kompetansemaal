/* global window:false */
(function(){
  'use strict';

  angular
    .module('kompetansemaal')
    .filter('prettyjson', function(){
      return function(obj){
        return window.prettyjson.render(obj, {noColor: true});
      };
    });
})();
