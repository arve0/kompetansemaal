(function(){
  'use strict';

  var prettyjson = require('prettyjson');

  angular
    .module('kompetansemaal')
    .filter('prettyjson', function(){
      return function(obj){
        return prettyjson.render(obj, {noColor: true});
      };
    });
})();
