(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Edificio", Edificio);
  
  Edificio.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "edificioFactory"];

  //Controller
  function Edificio ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, edificioFactory) {
                                 
     var $ctrl_e = this;
     
     $ctrl_e.objDataEdificio={};
     $ctrl_e.allow_disable=false;
     $ctrl_e.allow_visible=true;

    
     $ctrl_e.Init = Init;
     $ctrl_e.upDate = upDate;
     $ctrl_e.NuevoEdificio=NuevoEdificio;
        

      function Init () {
      };    

      function upDate () { 
      }

      function NuevoEdificio () {
                
        //$ctrl_e.allow_disable=true;

        $ctrl_e.objDataEdificio.type_accion="nuevo_edificio";
        
        edificioFactory.nuevoEdificio($ctrl_e.objDataEdificio).then(function(d) {                   
                $ctrl_e.Mensaje=d.Mensaje;
                //$ctrl_e.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_e.allow_disable=false;
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