(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Edificio", Edificio);
  
  Edificio.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "edificioFactory",  "formLoginFactory"];

  //Controller
  function Edificio ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, edificioFactory, formLoginFactory) {
                                 
     var $ctrl = this;
     
     $ctrl.objDataEdificio={};

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
     $ctrl.NuevoEdificio=NuevoEdificio;
        

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

      function NuevoEdificio () {
                
        //$ctrl.allow_disable=true;

        $ctrl.objDataEdificio.type_accion="nuevo_edificio";
        
        edificioFactory.nuevoEdificio($ctrl.objDataEdificio).then(function(d) {                   
                $ctrl.Mensaje=d.Mensaje;
                //$ctrl.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController

  function BuscarEdificio ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, edificioFactory, $filter) {

        $ctrl_be=this;
        $ctrl_be.objDataEdificio={};        
        $ctrl_be.Buscar=Buscar;

        function Buscar() {

          $ctrl_be.objDataEdificio.type_accion="buscar_edificio";

          edificioFactory.buscarEdificio($ctrl_be.objDataEdificio).then(function(d) {                   
                  $ctrl_be.Mensaje=d.Mensaje;     
      
           }).catch(function (err) {
                console.log(err);          
           });                
      };
    }

})(window.angular);