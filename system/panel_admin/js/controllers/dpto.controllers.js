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
     
     $ctrl_nd.objDataDpto={};
     $ctrl_nd.allow_disable=false;
     $ctrl_nd.allow_visible=true;

    
     $ctrl_nd.Init = Init;
     $ctrl_nd.upDate = upDate;
     $ctrl_nd.NuevoDpto=NuevoDpto;
        

      function Init () {

      };    

      function upDate () { 
      }

      function NuevoDpto () {
                
        //$ctrl_nd.allow_disable=true;

        $ctrl_nd.objDataDpto.type_accion="nuevo_dpto";
        
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