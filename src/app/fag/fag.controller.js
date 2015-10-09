(function() {
  'use strict';

  angular
    .module('kompetansemaal')
    .controller('FagController', FagController);

  /** @ngInject */
  function FagController($stateParams, udir, mainState, $log) {
    var fag = this;  // view model
    fag.state = mainState;  // access to language

    fag.params = $stateParams;
    fag.data = udir.getREST(fag.params.id).then(function(data){
      fag.data = data;

      for (var i=0, l=fag.data.opplaeringsfag.length; i<l; ++i){
        getLaereplanReferanse(fag.data.opplaeringsfag[i]);
      }
    });


    function getLaereplanReferanse(item){
      udir.getREST(item.kode)
        .then(function(opplaeringsfag){
          if (!('laereplanreferanse' in opplaeringsfag)) {
            $log.error('Referanse til læreplan ikke funnet for '+ item.kode);
            return;
          }
          item.laereplanreferanse = opplaeringsfag.laereplanreferanse;
        });
    }


  }
})();
