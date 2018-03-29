(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Actividad", Actividad);
  
  Actividad.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "actividadFactory"];

  //Controller
  function Actividad ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, actividadFactory) {
                                 
    var $ctrl_a = this;

    $ctrl_a.objDataActividad={};
    $ctrl_a.allow_disable=false;
    $ctrl_a.allow_visible=true;

    $ctrl_a.Init = Init;
    $ctrl_a.upDate = upDate;
    $ctrl_a.NuevaActividad=NuevaActividad;
        

    function Init () {
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