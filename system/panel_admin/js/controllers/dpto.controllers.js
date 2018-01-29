(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Dpto", Dpto);
  
  Dpto.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "dptoFactory"];

  //Controller
  function Dpto ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, dptoFactory) {
                                 
    var $ctrl_d = this;

    $ctrl_d.objDataDpto={};
    $ctrl_d.allow_disable=false;
    $ctrl_d.allow_visible=true;

    $ctrl_d.Init = Init;
    $ctrl_d.upDate = upDate;
    $ctrl_d.NuevoDpto=NuevoDpto;
        

    function Init () {
    };    

    function upDate () { 
    }

    function NuevoDpto () {
              
      //$ctrl_d.allow_disable=true;

      $ctrl_d.objDataDpto.type_accion="nuevo_dpto";
      
      dptoFactory.nuevoDpto($ctrl_d.objDataDpto).then(function(d) {                   
              $ctrl_d.Mensaje=d.Mensaje;
              //$ctrl_d.allow_disable=false;
  
       }).catch(function (err) {
            console.log(err);
            //$ctrl_d.allow_disable=false;
       });                
    };
      
     Init();

  }// DataSendController

})(window.angular);