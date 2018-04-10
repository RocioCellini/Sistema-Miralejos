(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('estadisticaFactory', function ($http, $sce, $stateParams) {

     var promisedata;
      
     var Estadistica = {

        setData: function(params) {
            promisedata=$http.post('php/sections/estadistica/nueva_estadistica.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return Estadistica;      
    });//  app.factory

})(window.angular);