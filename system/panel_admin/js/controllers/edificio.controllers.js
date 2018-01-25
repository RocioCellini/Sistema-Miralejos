(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoEdificio", NuevoEdificio);
  
  NuevoEdificio.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "edificioFactory"];

  //Controller
  function NuevoEdificio ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, edificioFactory) {
                                 
     var $ctrl_ne = this;
     
     $ctrl_ne.objDataEdificio={};
     $ctrl_ne.allow_disable=false;
     $ctrl_ne.allow_visible=true;

    
     $ctrl_ne.Init = Init;
     $ctrl_ne.upDate = upDate;
     $ctrl_ne.NuevoEdificio=NuevoEdificio;
        

      function Init () {

      };    

      function upDate () { 
      }

      function NuevoEdificio () {
                
        //$ctrl_ne.allow_disable=true;

        $ctrl_ne.objDataEdificio.type_accion="nuevo_edificio";
        
        edificioFactory.nuevoEdificio($ctrl_ne.objDataEdificio).then(function(d) {                   
                $ctrl_ne.Mensaje=d.Mensaje;
                //$ctrl_ne.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_ne.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController

  function BuscarEdificio ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, edificioFactory, $filter) {

        $ctrl_be=this;
        $ctrl_be.objDataEdificio={};        
        $ctrl_be.Buscar=Buscar;

        function Buscar() {

          $ctrl_be.objDataEdificio.type_accion="buscar_edificio";

          edificioFactory.buscarEdificio($ctrl_be.objDataEdificio).then(function(d) {                   
                  $ctrl_be.Mensaje=d.Mensaje;     
      
           }).catch(function (err) {
                console.log(err);          
           });                
      };
    }

})(window.angular);