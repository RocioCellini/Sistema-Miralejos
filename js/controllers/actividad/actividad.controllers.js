(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Actividad", Actividad);
  
  Actividad.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "actividadFactory", "formLoginFactory"];

  //Controller
  function Actividad ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, actividadFactory, formLoginFactory) {
                                 
    var $ctrl_a = this;

    $ctrl_a.objDataActividad={};
    $ctrl_a.objLogin ={};
    $ctrl_a.allow_disable=false;
    $ctrl_a.allow_visible=true;

    $ctrl_a.Init = Init;
    $ctrl_a.upDate = upDate;
    $ctrl_a.NuevaActividad=NuevaActividad;

     Object.defineProperty ( $ctrl_a.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
          }); // Esto hace que la propiedad type_accion no se pueda modificarv
        

    function Init () {
      formLoginFactory.checkSession( $ctrl_a.objLogin ).then( function( d ) {

                       angular.isDefined(d.setUrl)?goUrl( d ):null;
                                      
                            function goUrl ( d ) {
                                 
                                $state.go( d.setUrl );
                               
                            }
                        

        }); 
    };    

    function upDate () { 
    }

    function NuevaActividad () {
              
      //$ctrl_a.allow_disable=true;

      $ctrl_a.objDataActividad.type_accion="nueva_actividad";
      //console.log($ctrl_a.objDataActividad);
      
      actividadFactory.nuevaAct($ctrl_a.objDataActividad).then(function(d) {                   
              $ctrl_a.Mensaje=d.Mensaje;
              //$ctrl_a.allow_disable=false;
  
       }).catch(function (err) {
            console.log(err);
            //$ctrl_a.allow_disable=false;
       });                
    };
      
     Init();

  }// DataSendController

})(window.angular);