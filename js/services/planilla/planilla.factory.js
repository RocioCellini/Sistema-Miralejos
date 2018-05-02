(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('planillaFactory', function ($http, $sce, $stateParams) {

     var promisedata;
      
     var Planilla = {
            
        cargarPlanilla: function(params) {
            promisedata=$http.post('php/sections/planilla/cargar_planilla.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },
        
        verHistorial: function(params) {
            promisedata=$http.post('php/sections/historial/ver_historial.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };

      return Planilla;   

    });

})(window.angular);