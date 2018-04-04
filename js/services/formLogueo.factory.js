(function  (_angular){

    "use strict";

    var app=_angular.module("GestionVentas");

    app.factory('formFactory', function ($http, $sce, $stateParams) {
     
      var promise, allow_edit={};
     
      var ServiceLogIn = {

        setLogIn: function(objLogIn){
            promise=$http.post('php/formLogueo.php', objLogIn).then(function (response) {
                  return response.data;
              });
                return promise;
          },

        /*
        sendEdit: function () {

          return allow_edit.btn_edit;
        },
        setEdit: function setEdit (value) {
            console.log(value);
             allow_edit.btn_edit=value;
        },*/

      };//ServiceLogIn  
      
      return ServiceLogIn;      

    });//  app.factory

})(window.angular);