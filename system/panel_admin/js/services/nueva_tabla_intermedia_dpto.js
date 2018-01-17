(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('relacionFactory', function ($http, $sce, $stateParams) {

      var promisedata;      

      var ingresoRelacion = {
            
        nuevaRelacion: function(params) {
            promisedata=$http.post('php/sections/tabla_intermedia_dpto/nueva_tabla_intermedia_dpto.php', params).then(function (response) {
                return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return ingresoRelacion;      
    });//  app.factory

})(window.angular);