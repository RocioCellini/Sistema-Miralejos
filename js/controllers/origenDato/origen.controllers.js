(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("OrigenDato", OrigenDato);
  
  OrigenDato.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "origenDatoFactory",  "formLoginFactory"];

  //Controller
  function OrigenDato ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, origenDatoFactory, formLoginFactory) {
                                 
     var $ctrl_o = this;
     
     $ctrl_o.objDataOrigen={};

     $ctrl_o.objLogin ={};

      Object.defineProperty ( $ctrl_o.objLogin, "type_accion", {
            value: "checkSession",
            writable: false,
            enumerable: true,
            configurable: false
      }); 

     $ctrl_o.allow_disable=false;
     $ctrl_o.allow_visible=true;

    
     $ctrl_o.Init = Init;
     $ctrl_o.upDate = upDate;
     $ctrl_o.NuevoOrigen=NuevoOrigen;
        

      function Init () {

         formLoginFactory.checkSession($ctrl_o.objLogin).then( function(d) {

             angular.isDefined(d.setUrl)?goUrl(d):null;
                            
                  function goUrl (d) {                                 
                      $state.go( d.setUrl );                               
                  }
                        
          });       

      };    

      function upDate () { 
      };

      function NuevoOrigen () {
                
        $ctrl_o.allow_disable=true;

        $ctrl_o.objDataOrigen.type_accion="nuevo_origen";
        
        origenDatoFactory.nuevoOrigen( $ctrl_o.objDataOrigen ).then ( function( d ) {                   
               // $ctrl_o.Mensaje=d.Mensaje;
                //$ctrl_o.allow_disable=false;
                $ctrl_o.Mensaje=d.Mensaje;
                console.log($ctrl_o.objDataOrigen);
                //console.log(d);
                //console.log(d.Mensaje);
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_o.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController


})(window.angular);