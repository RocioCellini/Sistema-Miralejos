(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('llamadoFactory', function ($http, $sce, $stateParams) {

    var promisedata;
      

    var ingresoLlamado = {
            
        nuevoLlamado: function(params) {
            promisedata=$http.post('php/sections/llamado/nuevo_llamado.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        buscarLlamado: function(params) {
            promisedata=$http.post('php/sections/llamado/buscar_llamado.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        detalleLlamados: function(params) {
            promisedata=$http.post('php/sections/llamado/detalle_llamados.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },
        
        modificarLlamado: function(params) {
            promisedata=$http.post('php/sections/llamado/editar_llamado.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return ingresoLlamado;    

    });//  app.factory

})(window.angular);