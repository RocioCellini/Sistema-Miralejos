(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('clienteFactory', function ($http, $sce, $stateParams) {

     var promisedata;
      

     var abmCliente = {
            
        nuevoCliente: function(paramsearch) {
            promisedata=$http.post('php/nuevo_cliente.php', paramsearch).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API



      return abmCliente;      
  

  });//  app.factory



})(window.angular);