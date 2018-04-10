(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevaRelacion", NuevaRelacion);
  
  NuevaRelacion.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
  "relacionFactory", "defaultdataFactory", "formLoginFactory"];

  //Controller
  function NuevaRelacion ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, relacionFactory, defaultdataFactory, formLoginFactory) {
                                 
     var $ctrl = this;

     $ctrl.defaultparams={};
     $ctrl.objDataRelacion={};

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
     $ctrl.NuevaRelacion=NuevaRelacion;
        

      function Init () {      

          formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
          });       

          $ctrl.defaultparams.type_accion="buscar_edificio_planta_dpto";

          defaultdataFactory.buscar_edificio_planta_dpto($ctrl.defaultparams).then(function(d) {                            
                        
          console.log(d);    

          $ctrl.data_edificio = {
              availableOptions: d.edificio,
              selectedOption: {id_edificio: '1'}
            };

          $ctrl.data_planta = {
              availableOptions: d.planta,
              selectedOption: {id_planta: '1'} 
            };

          $ctrl.data_dpto = {
              availableOptions: d.dpto, 
              selectedOption: {id_dpto: '1'}
            };  

          }).catch(function (err) {
                  console.log(err);
              });    
      };    


      function NuevaRelacion () {
                
        //$ctrl.allow_disable=true;

        $ctrl.objDataRelacion.type_accion="nueva_relacion";        
       
        $ctrl.objDataRelacion.id_dpto=$ctrl.data_dpto.selectedOption.id_dpto;
        $ctrl.objDataRelacion.id_planta=$ctrl.data_planta.selectedOption.id_planta;
        $ctrl.objDataRelacion.id_edificio=$ctrl.data_edificio.selectedOption.id_edificio;
        
        relacionFactory.nuevaRelacion($ctrl.objDataRelacion).then(function(d) {                   
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