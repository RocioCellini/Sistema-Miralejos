(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("OrigenDato", OrigenDato);
  
  OrigenDato.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "origenDatoFactory"];

  //Controller
  function OrigenDato ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, origenDatoFactory) {
                                 
     var $ctrl_o = this;
     
     $ctrl_o.objDataOrigen={};
     $ctrl_o.allow_disable=false;
     $ctrl_o.allow_visible=true;

    
     $ctrl_o.Init = Init;
     $ctrl_o.upDate = upDate;
     $ctrl_o.NuevoOrigen=NuevoOrigen;
        

      function Init () {
      };    

      function upDate () { 
      }

      function NuevoOrigen () {
                
        //$ctrl_o.allow_disable=true;

        $ctrl_o.objDataOrigen.type_accion="nuevo_origen";
        
        origenDatoFactory.nuevoOrigen($ctrl_o.objDataOrigen).then(function(d) {                   
                $ctrl_o.Mensaje=d.Mensaje;
                //$ctrl_o.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_o.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController

  function BuscarOrigen ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, OrigenFactory, $filter) {

        $ctrl_be=this;
        $ctrl_be.objDataOrigen={};        
        $ctrl_be.Buscar=Buscar;

        function Buscar() {

          $ctrl_be.objDataOrigen.type_accion="buscar_origen";

          OrigenFactory.buscarOrigen($ctrl_be.objDataOrigen).then(function(d) {                   
                  $ctrl_be.Mensaje=d.Mensaje;     
      
           }).catch(function (err) {
                console.log(err);          
           });                
      };
    }

})(window.angular);