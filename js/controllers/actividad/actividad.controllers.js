(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Actividad", Actividad);
  
  Actividad.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "actividadFactory", "formLoginFactory"];

  //Controller
  function Actividad ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, actividadFactory, formLoginFactory) {
                                 
    var $ctrl = this;

    $ctrl.objDataActividad={};
    $ctrl.objLogin ={};
    $ctrl.allow_disable=false;
    $ctrl.allow_visible=true;

    $ctrl.Init = Init;
    $ctrl.Save=Save;

     Object.defineProperty ( $ctrl.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
          });
        

    function Init () {

      $ctrl.Titulo="Nueva Actividad";
      $ctrl.objDataActividad.type_accion="nueva_actividad";

      formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                       angular.isDefined(d.setUrl)?goUrl(d):null;
                                      
                            function goUrl (d) {
                                 
                                $state.go(d.setUrl);
                               
                            }
        }); 


      if( $stateParams.type_ingreso==="GestionVentas.modificarAct" ) {

          $ctrl.Titulo="Modificar Actividad";                
          $ctrl.objDataActividad=$stateParams.objdata;
          $ctrl.objDataActividad.type_accion="editar_act";

      } 
    };    

    function Save() {
              
        const metodo=$stateParams.type_ingreso.split(".");  //ES6 La variable CONST
                        
        actividadFactory[metodo[1]]($ctrl.objDataActividad).then(function(d) {   

          $ctrl.Mensaje=d.Mensaje;
    
        }).catch(function (err) {
              console.log(err);
        });    
            
    };
      
    Init();

  }// DataSendController

})(window.angular);