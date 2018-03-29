(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('vendedorFactory', function ($http, $sce, $stateParams) {

    var promisedata;      

    var Vendedor = {
            
        nuevoVendedor: function(params) {
            promisedata=$http.post('php/sections/vendedor/nuevo_vendedor.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        },

        buscarVendedor: function(params) {
            promisedata=$http.post('php/sections/vendedor/buscar_vendedor.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return Vendedor;     
       
    });

})(window.angular);