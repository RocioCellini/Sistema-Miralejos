(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Planta", Planta);
  
  Planta.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "plantaFactory", "formLoginFactory"];

  //Controller
  function Planta ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, plantaFactory, formLoginFactory) {
                                 
     var $ctrl = this;
     
     $ctrl.objDataPlanta={};

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
     $ctrl.NuevaPlanta=NuevaPlanta;
        

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

      function NuevaPlanta () {
                
        //$ctrl.allow_disable=true;

        $ctrl.objDataPlanta.type_accion="nueva_planta";
        
        plantaFactory.nuevaPlanta($ctrl.objDataPlanta).then(function(d) {                   
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