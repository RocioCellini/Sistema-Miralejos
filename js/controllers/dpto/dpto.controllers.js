(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Dpto", Dpto);
  
  Dpto.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "dptoFactory", "formLoginFactory"];

  //Controller
  function Dpto ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, dptoFactory, formLoginFactory) {
                                 
    var $ctrl = this;

    $ctrl.objDataDpto={};

    $ctrl.objLogin ={};

              Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                  value: "checkSession",
                  writable: false,
                  enumerable: true,
                  configurable: false
              }); 
    $ctrl.allow_disable=false;
    $ctrl.allow_visible=true;

    $ctrl.Init = Init;
    $ctrl.upDate = upDate;
    $ctrl.NuevoDpto=NuevoDpto;
        

    function Init () {

      formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

           angular.isDefined(d.setUrl)?goUrl(d):null;
                          
              function goUrl (d) {                                 
                  $state.go( d.setUrl );                               
              }
                
      }); 
      
    };    

    function upDate () { 
    }

    function NuevoDpto () {
              
      //$ctrl.allow_disable=true;

      $ctrl.objDataDpto.type_accion="nuevo_dpto";
      
      dptoFactory.nuevoDpto($ctrl.objDataDpto).then(function(d) {                   
              $ctrl.Mensaje=d.Mensaje;
              //$ctrl.allow_disable=false;
  
       }).catch(function (err) {
            console.log(err);
            //$ctrl.allow_disable=false;
       });                
    };
      
     Init();

  }// DataSendController

})(window.angular);