(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Inmobiliaria", Inmobiliaria);
  
  Inmobiliaria.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "inmobiliariaFactory",  "formLoginFactory"];

  //Controller
  function Inmobiliaria ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, inmobiliariaFactory, formLoginFactory) {
                                 
      var $ctrl = this;

      $ctrl.objDataInmob={};

      $ctrl.objLogin ={};

      Object.defineProperty ( $ctrl.objLogin, "type_accion", {
        value: "checkSession",
        writable: false,
        enumerable: true,
        configurable: false
      }); 

      $ctrl.allow_disable=false;
      $ctrl.allow_visible=true;

      $ctrl.Init = Init;
      $ctrl.Save=Save;
        

      function Init () {
        
        $ctrl.Titulo="Nueva Inmobiliaria";
        $ctrl.objDataInmob.type_accion="nueva_inmob";

        formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                      
            });     

        if( $stateParams.type_ingreso==="GestionVentas.modificarInmob" ) {

                $ctrl.Titulo="Modificar Inmobiliaria";                
                $ctrl.objDataInmob=$stateParams.objdata;
                $ctrl.objDataInmob.type_accion="editar_inmob";

            }     
      };    

      function Save() {
            
          const metodo=$stateParams.type_ingreso.split(".");  //ES6 La variable CONST

            console.log($stateParams.type_ingreso);
            console.log(metodo[1]);
                  
          inmobiliariaFactory[metodo[1]]($ctrl.objDataInmob).then(function(d) {   

            $ctrl.Mensaje=d.Mensaje;
      
          }).catch(function (err) {
                console.log(err);
          });   
      };
      
     Init();

  }// DataSendController


})(window.angular);