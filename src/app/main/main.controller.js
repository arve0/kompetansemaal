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

    $scope.search = { tooltip: false };
    $scope.$watch('search.query', function(query, oldVal){
      if (typeof query === 'undefined') {
        return;
      } else if (query.length < 2) {
        $scope.search.tooltip = true;
        vm.laereplaner = [];
        vm.fag = [];
        vm.kompetansemaal = [];
        return;
      } else {
        $scope.search.tooltip = false;
        vm.laereplaner = Laereplan.find('Tittel', query);
        vm.fag = Fag.find('Tittel', query);
        vm.kompetansemaal = Kompetansemaal.find('Tittel', query);
      }
    });


  }
})();
