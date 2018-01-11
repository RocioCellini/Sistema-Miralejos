(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('localidadFactory', function ($http, $sce, $stateParams) {

    var promisedata;
      
    var ingresoLocalidad = {
            
        nuevaLocalidad: function(params) {
            promisedata=$http.post('php/sections/localidad/nueva_localidad.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return ingresoLocalidad;      
    });//  app.factory

})(window.angular);