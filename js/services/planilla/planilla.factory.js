(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('planillaFactory', function ($http, $sce, $stateParams) {

     var promisedata;
      
     var Planilla = {
            
        nuevaPlanilla: function(params) {
            promisedata=$http.post('php/sections/planilla/agregar_datos.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return Planilla;      
    });//  app.factory

})(window.angular);