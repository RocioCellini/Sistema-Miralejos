(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("OrigenDato", OrigenDato);
  
  OrigenDato.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "origenDatoFactory",  "formLoginFactory"];

  //Controller
  function OrigenDato ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, origenDatoFactory, formLoginFactory) {
                                 
     var $ctrl = this;
     
     $ctrl.objDataOrigen={};

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
     $ctrl.NuevoOrigen=NuevoOrigen;
        

      function Init () {

         formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

             angular.isDefined(d.setUrl)?goUrl(d):null;
                            
                  function goUrl (d) {                                 
                      $state.go( d.setUrl );                               
                  }
                        
          });       

      };    

      function upDate () { 
      };

      function NuevoOrigen () {
                
        $ctrl.allow_disable=true;

        $ctrl.objDataOrigen.type_accion="nuevo_origen";
        
        origenDatoFactory.nuevoOrigen( $ctrl.objDataOrigen ).then ( function( d ) {                   
               // $ctrl.Mensaje=d.Mensaje;
                //$ctrl.allow_disable=false;
                $ctrl.Mensaje=d.Mensaje;
                console.log($ctrl.objDataOrigen);
                //console.log(d);
                //console.log(d.Mensaje);
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController


})(window.angular);