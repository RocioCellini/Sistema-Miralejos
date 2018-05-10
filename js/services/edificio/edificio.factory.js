(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('edificioFactory', function ($http, $sce, $stateParams) {

    var promisedata;
      
    var Edificio = {
            
        nuevoEdificio: function(params) {
            promisedata=$http.post('php/sections/edificio/nuevo_edificio.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        buscarEdificio: function(params) {
            promisedata=$http.post('php/sections/edificio/buscar_edificio.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        modificarEdificio: function(params) {
            promisedata=$http.post('php/sections/edificio/editar_edificio.php', params).then(function (response) {
                  return response.data;
        });

        return promisedata;
        },
        
        eliminarEdificio: function(params) {
            promisedata=$http.post('php/sections/edificio/eliminar_edificio.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return Edificio;      
    });//  app.factory

})(window.angular);