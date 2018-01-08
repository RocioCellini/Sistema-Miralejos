(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoDpto", NuevoDpto);
  
  NuevoDpto.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "dptoFactory"];

  //Controller
  function NuevoDpto ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, dptoFactory) {
                                 
     var $ctrl_nd = this;
     
     $ctrl_nd.objDataCliente={};
     $ctrl_nd.allow_disable=false;
     $ctrl_nd.allow_visible=true;

    
     $ctrl_nd.Init = Init;
     $ctrl_nd.upDate = upDate;
     $ctrl_nd.NuevoDpto=NuevoDpto;
        

      function Init () {

        console.log("Aqui Deben Llamarse los Combos");

        // $ctrl_ap.allow_disable=false;                   
        //self.objData=modifydataFactory.dataDefault();   
      };    

      function upDate () { 
      }

      function NuevoDpto () {
                
        //$ctrl_nd.allow_disable=true;

        $ctrl_nd.objDataDpto.type_accion="nuevo_dpto";
   
        $ctrl_nd.objDataDpto.id_provincia=1;
        $ctrl_nd.objDataDpto.id_localidad=5;
        $ctrl_nd.objDataDpto.conoce="si";
        
        dptoFactory.nuevoDpto($ctrl_nd.objDataDpto).then(function(d) {                   
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