(function  (_angular){

      "use strict";

     var app=_angular.module("GestionVentas");

     app.factory('dptoFactory', function ($http, $sce, $stateParams) {

     var promisedata;
      

     var ingresoDpto = {
            
        nuevoDpto: function(params) {
            promisedata=$http.post('php/sections/dpto/nuevo_dpto.php', params).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return ingresoDpto;      
    });//  app.factory



})(window.angular);