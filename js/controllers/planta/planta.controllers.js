(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Planta", Planta);
  
  Planta.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "plantaFactory", "formLoginFactory"];

  //Controller
  function Planta ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, plantaFactory, formLoginFactory) {
                                 
     var $ctrl_np = this;
     
     $ctrl_np.objDataPlanta={};

     $ctrl_np.objLogin ={};

     Object.defineProperty ( $ctrl_np.objLogin, "type_accion", {
            value: "checkSession",
            writable: false,
            enumerable: true,
            configurable: false
     }); 

     $ctrl_np.allow_disable=false;
     $ctrl_np.allow_visible=true;

    
     $ctrl_np.Init = Init;
     $ctrl_np.upDate = upDate;
     $ctrl_np.NuevaPlanta=NuevaPlanta;
        

      function Init () {

        formLoginFactory.checkSession($ctrl_np.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
              });       
        
      };    

      function upDate () { 
      }

      function NuevaPlanta () {
                
        //$ctrl_np.allow_disable=true;

        $ctrl_np.objDataPlanta.type_accion="nueva_planta";
        
        plantaFactory.nuevaPlanta($ctrl_np.objDataPlanta).then(function(d) {                   
                $ctrl_np.Mensaje=d.Mensaje;
                //$ctrl_np.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_np.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController

})(window.angular);