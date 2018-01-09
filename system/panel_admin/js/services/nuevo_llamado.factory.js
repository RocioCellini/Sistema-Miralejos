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
        }

      };//RETURN API

      return ingresoLlamado;      
    });//  app.factory



})(window.angular);