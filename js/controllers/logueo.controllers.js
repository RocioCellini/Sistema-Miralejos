(function( _angular ){

  "use strict";

  var app=_angular.module("GestionVentas");

    app.controller("LoginController", LoginController);
    LoginController.$inject = ["$scope","$http","$state","formLoginFactory"];

    function LoginController( $scope, $http, $state, formLoginFactory ) {
    
        var $ctrl=this;

        $ctrl.LogIn = LogIn;
        $ctrl.objLogin={};
        $ctrl.Message="";
        $ctrl.logbutton=false;

      Object.defineProperty ( $ctrl.objLogin, "type_accion", {
              value: "log_in",
              writable: false,
              enumerable: true,
              configurable: false
          }); 

        function LogIn () {
        
             $ctrl.logbutton=true;
        
            	  formLoginFactory.setLogin( $ctrl.objLogin ).then( function( d ) {

            	
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

})( window.angular );