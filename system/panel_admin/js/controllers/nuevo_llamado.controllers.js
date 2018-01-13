(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoLlamado", NuevoLlamado);
  
  NuevoLlamado.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "llamadoFactory", "defaultdataFactory"];

  //Controller
  function NuevoLlamado ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, llamadoFactory, defaultdataFactory) {
                                 
     var $ctrl_nl = this;
     
     $ctrl_nl.defaultparams={};
     $ctrl_nl.objDataLlamado={};
     $ctrl_nl.allow_disable=false;
     $ctrl_nl.allow_visible=true;

    
     $ctrl_nl.Init = Init;
     $ctrl_nl.upDate = upDate;
     $ctrl_nl.NuevoLlamado=NuevoLlamado;
        

      function Init () {

            $ctrl_nl.defaultparams.type_accion="search_edificio_planta_dpto";
            defaultdataFactory.buscar_edificio_planta_dpto($ctrl_nl.defaultparams).then(function(d) {                            
              
            $ctrl_nl.data_edificio = {
                availableOptions: d.edificio,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
            };

            $ctrl_nl.data_planta = {
                availableOptions: d.planta,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
            };

            $ctrl_nl.data_dpto = {
                availableOptions: d.dpto,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
            };
      
           }).catch(function (err) {
                console.log(err);
           });                

      };    

      function upDate () { 
      }

      function NuevoLlamado () {
                
        //$ctrl_nl.allow_disable=true;

        $ctrl_nl.objDataLlamado.type_accion="nuevo_llamado";

        $ctrl_nl.objDataLlamado.id_edificio=$ctrl_nl.data_edificio.selectedOption.id;
        $ctrl_nl.objDataLlamado.id_planta=$ctrl_nl.data_planta.selectedOption.id;
        $ctrl_nl.objDataLlamado.id_dpto=$ctrl_nl.data_dpto.selectedOption.id;
        
    /*
        llamadoFactory.nuevoLlamado($ctrl_nl.objDataLlamado).then(function(d) {                   
                $ctrl_nl.Mensaje=d.Mensaje;
                //$ctrl_nl.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_nl.allow_disable=false;
         });                
    */
    };
      
     Init();

  }// DataSendController

})(window.angular);