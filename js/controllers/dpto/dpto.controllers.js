(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Dpto", Dpto);
  
  Dpto.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "dptoFactory", "formLoginFactory"];

  //Controller
  function Dpto ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, dptoFactory, formLoginFactory) {
                                 
    var $ctrl_d = this;

    $ctrl_d.objDataDpto={};

    $ctrl_d.objLogin ={};

              Object.defineProperty ( $ctrl_d.objLogin, "type_accion", {
                  value: "checkSession",
                  writable: false,
                  enumerable: true,
                  configurable: false
              }); 
    $ctrl_d.allow_disable=false;
    $ctrl_d.allow_visible=true;

    $ctrl_d.Init = Init;
    $ctrl_d.upDate = upDate;
    $ctrl_d.NuevoDpto=NuevoDpto;
        

    function Init () {

      formLoginFactory.checkSession($ctrl_d.objLogin).then( function(d) {

           angular.isDefined(d.setUrl)?goUrl(d):null;
                          
              function goUrl (d) {                                 
                  $state.go( d.setUrl );                               
              }
                
      }); 
      
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