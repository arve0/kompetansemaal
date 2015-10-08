/* global window:false */
(function(){
  'use strict';

  angular
    .module('kompetansemaal')
    .filter('highlightText', highlightFilter);

      /** nigInject */
      function highlightFilter($sce) {

        /**
         * enclose search in text with span.highlightedText
         */
        return function highlight(text, search) {
          if (text && search) {
            var reg = new RegExp(search, 'gi');
            text = text.replace(reg, '<span class="highlightedText">$&</span>');
          }
          return $sce.trustAsHtml(text);
        }

      }

})();
