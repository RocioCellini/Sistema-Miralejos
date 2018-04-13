(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Inmobiliaria", Inmobiliaria);
  
  Inmobiliaria.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "inmobiliariaFactory",  "formLoginFactory"];

  //Controller
  function Inmobiliaria ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, inmobiliariaFactory, formLoginFactory) {
                                 
     var $ctrl = this;
     
     $ctrl.objDataInmob={};

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
     $ctrl.NuevaInmob=NuevaInmob;
        

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

      function NuevaInmob () {
                
        //$ctrl.allow_disable=true;

        $ctrl.objDataInmob.type_accion="nueva_inmob";
        
        inmobiliariaFactory.nuevaInmobiliaria($ctrl.objDataInmob).then(function(d) {                   
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