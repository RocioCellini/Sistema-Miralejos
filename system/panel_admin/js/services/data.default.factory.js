(function (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");
    app.factory('defaultdataFactory', function ($http, $stateParams) {

    var promisedata, datasearch;

    var defaultdata = {

        buscarProvinciaLocalidad: function(paramsearch) {
            promisedata=$http.post('php/sections/datos.default.factory.php', paramsearch).then(function (response) {
                  return response.data;
              });
           
          return promisedata;
        },

        buscar_edificio_planta_dpto: function(paramsearch) {
            promisedata=$http.post('php/sections/datos.default.factory.php', paramsearch).then(function (response) {
                  return response.data;
              });
           
          return promisedata;
        },
        
        relacion_edificio_planta_dpto: function(paramsearch) {
            promisedata=$http.post('php/sections/datos.default.factory.php', paramsearch).then(function (response) {
                  return response.data;
              });
           
          return promisedata;
        }


    };//myService
    
    return defaultdata;      
    
    });//  app.factory

})(window.angular);