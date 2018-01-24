(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoEdificio", NuevoEdificio);
  
  NuevoEdificio.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "edificioFactory"];

  //Controller
  function NuevoEdificio ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, edificioFactory) {
                                 
     var $ctrl_nd = this;
     
     $ctrl_nd.objDataEdificio={};
     $ctrl_nd.allow_disable=false;
     $ctrl_nd.allow_visible=true;

    
     $ctrl_nd.Init = Init;
     $ctrl_nd.upDate = upDate;
     $ctrl_nd.NuevoEdificio=NuevoEdificio;
        

      function Init () {

      };    

      function upDate () { 
      }

      function NuevoEdificio () {
                
        //$ctrl_nd.allow_disable=true;

        $ctrl_nd.objDataEdificio.type_accion="nuevo_edificio";
        
        edificioFactory.nuevoEdificio($ctrl_nd.objDataEdificio).then(function(d) {                   
                $ctrl_nd.Mensaje=d.Mensaje;
                //$ctrl_nd.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_nd.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController

})(window.angular);