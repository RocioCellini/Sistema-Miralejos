(function  (_angular){

      "use strict";

     var app=_angular.module("myFomrC1");

     app.factory('pacientedataFactory', function ($http, $sce, $stateParams) {

     var promisedata;
      

     var ingresoPaciente = {
            
        buscarPaciente: function(paramsearch) {
            promisedata=$http.post('php/paciente.fc1.php', paramsearch).then(function (response) {
                  return response.data;
        });
           
          return promisedata;
        }

      };//RETURN API

      return ingresoPaciente;      
    });//  app.factory



})(window.angular);