(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('formLoginFactory', function ($http, $sce, $stateParams) {
     
      var promise, allow_edit={};
     
      var ServiceLogIn = {

        setLogin: function( objLogIn ) {

            promise=$http.post('php/formLogueo.php', objLogIn).then(function (response) {
                
                  return response.data;
              });
               
                return promise;
          },
          
          checkSession: function( objLogIn ) {

            promise=$http.post('php/formLogueo.php', objLogIn).then(function (response) {
                
                  return response.data;
              });
               
                return promise;
          },

          setLogOut: function( objLogIn ) {

            promise=$http.post('php/formLogueo.php', objLogIn).then(function (response) {
                
                  return response.data;
              });
               
                return promise;
          }


      };//ServiceLogIn  
      
      return ServiceLogIn;      

    });//  app.factory

})(window.angular);