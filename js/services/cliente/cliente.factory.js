(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('clienteFactory', function ($http, $sce, $stateParams) {

     var promisedata;
      
     var Cliente = {
            
        nuevoCliente: function(params) {
            promisedata=$http.post('php/sections/cliente/nuevo_cliente.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },
        
        buscarCliente: function(params) {
            promisedata=$http.post('php/sections/cliente/buscar_cliente.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },
        
        editarCliente: function(params) {
            promisedata=$http.post('php/sections/cliente/editar_cliente.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return Cliente;      
    });//  app.factory

})(window.angular);