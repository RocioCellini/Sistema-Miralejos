(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("OrigenDato", OrigenDato);
  
  OrigenDato.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "origenDatoFactory",  "formLoginFactory"];

  //Controller
  function OrigenDato ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, origenDatoFactory, formLoginFactory) {
                                 
     var $ctrl = this;
     
     $ctrl.objDataOrigen={};

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

          $ctrl.Titulo="Nuevo Origen Dato";
          $ctrl.Boton="Guardar";
          $ctrl.objDataOrigen.type_accion="nuevo_origen";

          formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

             angular.isDefined(d.setUrl)?goUrl(d):null;
                            
                  function goUrl (d) {                                 
                      $state.go( d.setUrl );                               
                  }
                        
          });    

          if( $stateParams.type_ingreso==="GestionVentas.modificarOrigen" ) {

              $ctrl.Titulo="Modificar Origen Dato";
              $ctrl.Boton="Guardar";                
              $ctrl.objDataOrigen=$stateParams.objdata;
              $ctrl.objDataOrigen.type_accion="editar_origen";

          }    

          if( $stateParams.type_ingreso==="GestionVentas.eliminarOrigen" ) {                       

              $ctrl.Titulo="Eliminar Origen Dato";
              $ctrl.Boton="Eliminar";
              $ctrl.objDataOrigen=$stateParams.objdata;
              $ctrl.objDataOrigen.type_accion="eliminar_origen";

            }
          
      };    

      function Save() {
                
          const metodo=$stateParams.type_ingreso.split(".");  //ES6 La variable CONST
                        
          origenDatoFactory[metodo[1]]($ctrl.objDataOrigen).then(function(d) {   

            $ctrl.Mensaje=d.Mensaje;
      
          }).catch(function (err) {
                console.log(err);
          });            
      };
      
     Init();

  }// DataSendController

})(window.angular);