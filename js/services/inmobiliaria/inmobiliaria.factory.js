(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('inmobiliariaFactory', function ($http, $sce, $stateParams) {

     var promisedata;
      

     var Inmobiliaria = {
            
        nuevaInmobiliaria: function(params) {
            promisedata=$http.post('php/sections/inmobiliaria/nueva_inmob.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },
        
        buscarInmobiliaria: function(params) {
            promisedata=$http.post('php/sections/inmobiliaria/buscar_inmob.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

      };//RETURN API

      return Inmobiliaria;      
    });//  app.factory

})(window.angular);