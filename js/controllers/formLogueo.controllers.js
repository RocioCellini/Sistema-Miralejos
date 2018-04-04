(function(_angular){

  "use strict";

  var app=_angular.module("GestionVentas");

    app.controller("LoginController", LoginController);
    LoginController.$inject = ["$scope","$http","$state","formFactory"];

    function LoginController($scope, $http, $state, formFactory) {
    
        var $ctrl=this;

        $ctrl.LogIn = LogIn;
        $ctrl.objLogIn={};
        $ctrl.Message="";
        $ctrl.logbutton=false;

        function LogIn (){
        
            $ctrl.logbutton=true;

            $ctrl.objLogIn.type_accion="log_in"; 
           
            	  formFactory.setLogIn( $ctrl.objLogIn ).then( function( d ) {

            	
                          angular.isDefined(d.Message)?enabledButton(d.Message):null;
                          angular.isDefined(d.setUrl)?goUrl( d ):null;
                       
                            
                            function enabledButton ( d ) {

                                $ctrl.Message=d;
                                $ctrl.logbutton=false;
                            }

                            function goUrl ( d ) {
                                 
                                $state.go( d.setUrl );
                               
                            }
                        

            	}); //d es la promise que está en el factory y devuelve el mensaje que está en el php
       
        } //LogIn 
 
    }// formController

})(window.angular);