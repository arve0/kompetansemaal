(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(udir, $scope) {
    var vm = this;  // view model
    var Laereplan = udir.odataResource('Læreplan');
    var Fag = udir.odataResource('Fagkode');
    var Kompetansemaal = udir.odataResource('Kompetansemål');

    $scope.$watch('query', function(query){
      if (!query) return;
      if (query.length < 2) {
        vm.laereplaner = [ {Tittel: 'Søk med mer enn 1 bokstav.'} ]
        vm.fag = [ {Tittel: 'Søk med mer enn 1 bokstav.'} ]
        vm.kompetansemaal = [ {Tittel: 'Søk med mer enn 1 bokstav.'} ]
      } else {
        vm.laereplaner = Laereplan.find('Tittel', query);
        vm.fag = Fag.find('Tittel', query);
        vm.kompetansemaal = Kompetansemaal.find('Tittel', query);
      }
    });

  }
})();
