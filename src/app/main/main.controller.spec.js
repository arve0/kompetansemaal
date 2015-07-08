(function() {
  'use strict';

  describe('main controller', function(){

    beforeEach(module('kompetansemaal'));

    var $httpBackend;
    beforeEach(inject(function($injector, udir){
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend
        .whenJSONP(udir.baseUrl +
          "odata/Læreplan?$callback=JSON_CALLBACK&$filter=(Status+eq+'http:%2F%2Fpsi.udir.no%2Fontologi%2Fstatus%2Fpublisert')&$format=json")
        .respond({d: { results: [
          {
            "__metadata": {
              "uri": "http://data.udir.no/kl06/ODATA/L%C3%A6replan('ADI2-01')",
              "type": "Udir.Lkt.Dokumenter.OData2.L\u00e6replanInformasjon"
            },
            "Tittel": "Programomr\u00e5de for anleggsgartner- og idrettsanleggsfag - L\u00e6replan i felles programfag Vg2",
            "GyldigFra": "\/Date(1185926400000)\/",
            "GyldigTil": null,
            "Kode": "ADI2-01",
            "Psi": "uuid:8b5168a9-d88f-4f4b-805d-f5ea51d1f590",
            "UrlData": "http://data.udir.no/kl06/ADI2-01",
            "UrlPsi": "http://psi.udir.no/kl06/ADI2-01",
            "SistEndret": "\/Date(1376570191000)\/",
            "Status": "http://psi.udir.no/ontologi/status/publisert"
          }]}});
    }));

    it('should list curriculums', inject(function($controller) {
      var vm = $controller('MainController');
      $httpBackend.flush();

      expect(angular.isArray(vm.lp)).toBe(true);
      expect(vm.lp.length === 1).toBe(true);
    }));
  });
})();
