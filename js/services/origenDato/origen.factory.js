(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('origenDatoFactory', function ($http, $sce, $stateParams) {

    var promisedata;
      
    var OrigenDato = {
            
        nuevoOrigen: function(params) {
            promisedata=$http.post('php/sections/origenDato/nuevo_origen.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        buscarOrigen: function(params) {
            promisedata=$http.post('php/sections/origenDato/buscar_origen.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        modificarOrigen: function(params) {
            promisedata=$http.post('php/sections/origenDato/editar_origen.php', params).then(function (response) {
                  return response.data;
        });

        return promisedata;
        },
        
        eliminarOrigen: function(params) {
            promisedata=$http.post('php/sections/origenDato/eliminar_origen.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return OrigenDato;      
    });//  app.factory

})(window.angular);