(function( _angular ){

  "use strict";

  var app=_angular.module("GestionVentas");

    app.controller("LogOutController", LogOutController);
    LogOutController.$inject = ["$scope","$http","$state","formLoginFactory"];

    function LogOutController( $scope, $http, $state, formLoginFactory ) {
    
        var $ctrl=this;

        $ctrl.LogOut = LogOut;
        $ctrl.Message="Cerrando Sesion";
        $ctrl.objLogout={};

         Object.defineProperty ($ctrl.objLogout, "type_accion", {
              value: "logout",
              writable: false,
              enumerable: true,
              configurable: false
          }); 



        function LogOut () {        

                console.log($ctrl.objLogout);

            	  formLoginFactory.setLogOut( $ctrl.objLogout ).then( function( d ) {

                        console.log(d);


            	
                          angular.isDefined(d.setUrl)?goUrl( d ):null;
                       

                            function goUrl ( d ) {
                                
                                $state.go( d.setUrl );
                               
                            }
                        

            	}).catch(function (err) {

                   $ctrl.Message="Intente Mas Tarde";
               
                }); //d es la promise que está en el factory y devuelve el mensaje que está en el php
       
        } //LogIn 

        LogOut ();
 
    }// formController

})( window.angular );