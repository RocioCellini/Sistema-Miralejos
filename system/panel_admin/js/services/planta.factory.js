(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('plantaFactory', function ($http, $sce, $stateParams) {

     var promisedata;      

     var ingresoPlanta = {
            
        nuevaPlanta: function(params) {
            promisedata=$http.post('php/sections/planta/nueva_planta.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return ingresoPlanta;      
    });//  app.factory

})(window.angular);