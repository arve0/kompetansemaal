/* global malarkey:false, toastr:false, moment:false, Clipboard: false */
(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('Clipboard', Clipboard);

})();
