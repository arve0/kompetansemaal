(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(udir, $scope, mainState) {
    var main = this;  // controller as main
    main.state = mainState;
    var state = mainState;  // short-hand

    var Laereplan = udir.odataResource('Læreplan');
    var Fag = udir.odataResource('Fagkode');
    var Kompetansemaal = udir.odataResource('Kompetansemål');

    $scope.$watch('main.state.search.query', function(query, oldVal){
      if (typeof query === 'undefined' || query === oldVal) {
        return;
      } else if (query.length < 2) {
        state.search.tooltip = true;
        state.laereplaner = [];
        state.fag = [];
        state.kompetansemaal = [];
        return;
      } else {
        state.search.tooltip = false;
        state.laereplaner = Laereplan.find('Tittel', query);
        state.fag = Fag.find('Tittel', query);
        state.kompetansemaal = Kompetansemaal.find('Tittel', query);
      }
    });

  }

})();
