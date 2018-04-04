(function(_angular){

  "use strict";

  var app=_angular.module("GestionVentas");

    app.controller("formController", formController);
    formController.$inject = ["$scope","$http","$state","formFactory"];

    function formController($scope, $http, $state, formFactory) {
    
        var $ctrl=this;
        $ctrl.LogIn = LogIn;
        $ctrl.objLogIn={};
        $ctrl.Message="";
        $ctrl.logbutton=false;

        function LogIn (){
        
            $ctrl.logbutton=true;

            $ctrl.objLogIn.type_accion="log_in"; 
           
            	  formFactory.setLogIn($ctrl.objLogIn).then(function(d){
            	
                          //angular.isDefined(d.Message)?enabledButton(d.Message):null;
                          //angular.isDefined(d.setUrl)?goUrl(d.setUrl):null;

                          console.log($ctrl.objLogIn);
                           console.log(d);
                           $state.go(d.setUrl);
                            console.log(d.setUrl);
                            /*
                            function enabledButton (d) {
                                $ctrl.Message=d;
                                $ctrl.logbutton=false;
                            }

                            function goUrl (d){
                              
                                formFactory.setEdit(d.obj_edit);
                                $state.go(d.setUrl);
                                console.log(d.setUrl);
                            }
                            */

            	}); //d es la promise que est� en el factory y devuelve el mensaje que est� en el php
       
        } //LogIn 
 
    }// formController

})(window.angular);