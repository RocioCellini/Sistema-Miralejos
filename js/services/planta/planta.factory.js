(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('plantaFactory', function ($http, $sce, $stateParams) {

     var promisedata;      

     var Planta = {
            
        nuevaPlanta: function(params) {
            promisedata=$http.post('php/sections/planta/nueva_planta.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },
        
        buscarPlanta: function(params) {
            promisedata=$http.post('php/sections/planta/buscar_planta.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        modificarPlanta: function(params) {
            promisedata=$http.post('php/sections/planta/editar_planta.php', params).then(function (response) {
                  return response.data;
        });

        return promisedata;
        },
        
        eliminarPlanta: function(params) {
            promisedata=$http.post('php/sections/planta/eliminar_planta.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return Planta;      
    });//  app.factory

})(window.angular);