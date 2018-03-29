(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('AgregarDatosFactory', function ($http, $sce, $stateParams) {

    var promisedata;

    var ingresoFila = {
            
        nuevaFila: function(params) {
            promisedata=$http.post('php/sections/planilla/agregar_datos.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return ingresoFila;      
    });//  app.factory

})(window.angular);