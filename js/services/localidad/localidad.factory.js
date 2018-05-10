(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('localidadFactory', function ($http, $sce, $stateParams) {

    var promisedata;
      
    var Localidad = {
            
        nuevaLocalidad: function(params) {
            promisedata=$http.post('php/sections/localidad/nueva_localidad.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        buscarLocalidad: function(params) {
            promisedata=$http.post('php/sections/localidad/buscar_localidad.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },
        
        modificarLocalidad: function(params) {
            promisedata=$http.post('php/sections/localidad/editar_localidad.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },
        
        eliminarLocalidad: function(params) {
            promisedata=$http.post('php/sections/localidad/eliminar_localidad.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return Localidad;      
    });//  app.factory

})(window.angular);