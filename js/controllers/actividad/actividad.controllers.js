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
    $ctrl.upDate = upDate;
    $ctrl.NuevaActividad=NuevaActividad;

     Object.defineProperty ( $ctrl.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
          }); // Esto hace que la propiedad type_accion no se pueda modificarv
        

    function Init () {
      formLoginFactory.checkSession( $ctrl.objLogin ).then( function( d ) {

                       angular.isDefined(d.setUrl)?goUrl( d ):null;
                                      
                            function goUrl ( d ) {
                                 
                                $state.go( d.setUrl );
                               
                            }
                        

        }); 
    };    

    function upDate () { 
    }

    function NuevaActividad () {
              
      //$ctrl.allow_disable=true;

      $ctrl.objDataActividad.type_accion="nueva_actividad";
      //console.log($ctrl.objDataActividad);
      
      actividadFactory.nuevaAct($ctrl.objDataActividad).then(function(d) {                   
              $ctrl.Mensaje=d.Mensaje;
              //$ctrl.allow_disable=false;
  
       }).catch(function (err) {
            console.log(err);
            //$ctrl.allow_disable=false;
       });                
    };
      
     Init();

  }// DataSendController

})(window.angular);