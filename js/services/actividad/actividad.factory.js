(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('actividadFactory', function ($http, $sce, $stateParams) {

     var promisedata;
      

     var Actividad = {
            
        nuevaAct: function(params) {
            promisedata=$http.post('php/sections/actividad/nueva_actividad.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },
        
        buscarAct: function(params) {
            promisedata=$http.post('php/sections/actividad/buscar_actividad.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        modificarAct: function(params) {
            promisedata=$http.post('php/sections/actividad/editar_actividad.php', params).then(function (response) {
                  return response.data;
        });

        return promisedata;
        }

      };//RETURN API

      return Actividad;      
    });//  app.factory

})(window.angular);