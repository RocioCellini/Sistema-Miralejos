(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevaRelacion", NuevaRelacion);
  
  NuevaRelacion.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "relacionFactory", "dataRelacionFactory"];

  //Controller
  function NuevaRelacion ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, relacionFactory, dataRelacionFactory) {
                                 
     var $ctrl_nr = this;
     
     $ctrl_nr.defaultparams={};
     $ctrl_nr.objDataRelacion={};
     $ctrl_nr.allow_disable=false;
     $ctrl_nr.allow_visible=true;

    
     $ctrl_nr.Init = Init;
     $ctrl_nr.upDate = upDate;
     $ctrl_nr.NuevaRelacion=NuevaRelacion;
        

      function Init () {
        $ctrl_nr.defaultparams.type_accion="add_relacion";
                dataRelacionFactory.buscar_edificio_planta_dpto($ctrl_nr.defaultparams).then(function(d) {        

              $ctrl_nr.data_edificio = {
                availableOptions: d.edificio,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

              $ctrl_nr.data_planta = {
                  availableOptions: d.planta,
                  selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

              $ctrl_nr.data_dpto = {
                  availableOptions: d.dpto,
                  selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };
          
               }).catch(function (err) {
                    console.log(err);
               });                
             
      };    

      function upDate () { 
      }

      function NuevaRelacion () {
                
        //$ctrl_nr.allow_disable=true;

        $ctrl_nr.objDataRelacion.type_accion="nueva_ti_relacion";

        $ctrl_nr.objDataRelacion.id_edificio=$ctrl_nr.data_edificio.selectedOption.id;
        $ctrl_nr.objDataRelacion.id_planta=$ctrl_nr.data_planta.selectedOption.id;
        $ctrl_nr.objDataRelacion.id_dpto=$ctrl_nr.data_dpto.selectedOption.id;
        
        relacionFactory.nuevaRelacion($ctrl_nr.objDataRelacion).then(function(d) {                   
                $ctrl_nr.Mensaje=d.Mensaje;
                //$ctrl_nr.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_nr.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController

})(window.angular);