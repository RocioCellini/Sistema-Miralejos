(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Edificio", Edificio);
  
  Edificio.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "edificioFactory",  "formLoginFactory"];

  //Controller
  function Edificio ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, edificioFactory, formLoginFactory) {
                                 
      var $ctrl = this;

      $ctrl.objDataEdificio={};

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

        $ctrl.Titulo="Nuevo Edificio";
        $ctrl.Boton="Guardar";
        $ctrl.objDataEdificio.type_accion="nuevo_edificio";
        
        formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                      
            });     

        if( $stateParams.type_ingreso==="GestionVentas.modificarEdificio" ) {

                $ctrl.Titulo="Modificar Edificio";    
                $ctrl.Boton="Guardar";            
                $ctrl.objDataEdificio=$stateParams.objdata;
                $ctrl.objDataEdificio.type_accion="editar_edificio";

            }    

        if( $stateParams.type_ingreso==="GestionVentas.eliminarEdificio" ) {                       

                $ctrl.Titulo="Eliminar Edificio";
                $ctrl.Boton="Eliminar";
                $ctrl.objDataEdificio=$stateParams.objdata;
                $ctrl.objDataEdificio.type_accion="eliminar_edificio";

            }

      };    

      function Save () {
                
          const metodo=$stateParams.type_ingreso.split(".");  //ES6 La variable CONST
                  
          edificioFactory[metodo[1]]($ctrl.objDataEdificio).then(function(d) {   

            $ctrl.Mensaje=d.Mensaje;
      
          }).catch(function (err) {
                console.log(err);
          });         

      };
      
     Init();

  }// DataSendController

})(window.angular);