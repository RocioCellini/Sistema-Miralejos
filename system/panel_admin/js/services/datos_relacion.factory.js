(function (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");
    app.factory('dataRelacionFactory', function ($http, $stateParams) {

    var promisedata, datasearch;

    var defaultdata = {

        buscar_edificio_planta_dpto: function(paramsearch) {
            promisedata=$http.post('php/sections/tabla_intermedia_dpto/datos_relacion.php', paramsearch).then(function (response) {
                  return response.data;
              });
           
          return promisedata;
        }

    };//myService
    
    return defaultdata;      
    
    });//  app.factory

})(window.angular);