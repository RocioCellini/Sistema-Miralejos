(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoLlamado", NuevoLlamado);
  
  NuevoLlamado.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "llamadoFactory"];

  //Controller
  function NuevoLlamado ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, llamadoFactory) {
                                 
     var $ctrl_nl = this;
     
     $ctrl_nl.objDataLlamado={};
     $ctrl_nl.allow_disable=false;
     $ctrl_nl.allow_visible=true;

    
     $ctrl_nl.Init = Init;
     $ctrl_nl.upDate = upDate;
     $ctrl_nl.NuevoLlamado=NuevoLlamado;
        

      function Init () {

        console.log("Aqui Deben Llamarse los Combos");

        // $ctrl_ap.allow_disable=false;                   
        //self.objData=modifydataFactory.dataDefault();   
      };    

      function upDate () { 
      }

      function NuevoLlamado () {
                
        //$ctrl_nl.allow_disable=true;

        $ctrl_nl.objDataLlamado.type_accion="nuevo_llamado";

        $ctrl_nl.objDataLlamado.fecha_origen_dato="3-2-18";

        $ctrl_nl.objDataLlamado.anotaciones="muy bueno";
        
        llamadoFactory.nuevoLlamado($ctrl_nl.objDataLlamado).then(function(d) {                   
                $ctrl_nl.Mensaje=d.Mensaje;
                //$ctrl_nl.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_nl.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController

})(window.angular);