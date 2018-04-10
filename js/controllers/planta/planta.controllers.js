(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Planta", Planta);
  
  Planta.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "plantaFactory", "formLoginFactory"];

  //Controller
  function Planta ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, plantaFactory, formLoginFactory) {
                                 
     var $ctrl_p = this;
     
     $ctrl_p.objDataPlanta={};

     $ctrl_p.objLogin ={};

     Object.defineProperty ( $ctrl_p.objLogin, "type_accion", {
            value: "checkSession",
            writable: false,
            enumerable: true,
            configurable: false
     }); 

     $ctrl_p.allow_disable=false;
     $ctrl_p.allow_visible=true;

    
     $ctrl_p.Init = Init;
     $ctrl_p.upDate = upDate;
     $ctrl_p.NuevaPlanta=NuevaPlanta;
        

      function Init () {

        formLoginFactory.checkSession($ctrl_p.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
              });       
        
      };    

      function upDate () { 
      }

      function NuevaPlanta () {
                
        //$ctrl_p.allow_disable=true;

        $ctrl_p.objDataPlanta.type_accion="nueva_planta";
        
        plantaFactory.nuevaPlanta($ctrl_p.objDataPlanta).then(function(d) {                   
                $ctrl_p.Mensaje=d.Mensaje;
                //$ctrl_p.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_p.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController

})(window.angular);