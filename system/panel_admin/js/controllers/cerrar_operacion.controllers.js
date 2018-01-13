(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("CerrarOperacion", CerrarOperacion);
  
  CerrarOperacion.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "CerrarOperacionFactory", "defaultdataFactory"];

          //Controller
          function CerrarOperacion ($scope, $sce, $state,  $stateParams,  $window,
           $uibModal, $document, CerrarOperacionFactory, defaultdataFactory) {
                                         
                 var $ctrl_co = this;
                 
                 $ctrl_co.objDataCerrarOperacion={};
                 $ctrl_co.defaultparams={};
                 $ctrl_co.allow_disable=false;
                 $ctrl_co.allow_visible=true;
                             
                 // For Modal
                 $ctrl_co.itemsModals=[];
                 $ctrl_co.itemWarning=[];
                 $ctrl_co.animationsEnabled=true;               
                
                 $ctrl_co.Init = Init;
                 $ctrl_co.upDate = upDate;
                 $ctrl_co.CerrarOperacion=CerrarOperacion;
                

                 $ctrl_co.data = {
                  availableOptions: [
                    {id: '-1', name: 'Seleccionar'},
                    {id: '0', name: 'Miralejos 1'},
                    {id: '1', name: 'Miralejos 2'},
                    {id: '1', name: 'Miralejos 3'},
                    {id: '1', name: 'Miralejos 4'},
                    {id: '1', name: 'Miralejos 5'},
                    {id: '1', name: 'Miralejos 6'},
                    {id: '1', name: 'Miralejos 7'},
                    {id: '1', name: 'Miralejos 8'},
                    {id: '1', name: 'Miralejos 9'},               
                    {id: '1', name: 'Miralejos 11'},
                    {id: '1', name: 'Miralejos 12'},
                    {id: '1', name: 'Miralejos 14'},
                    {id: '1', name: 'Miralejos 15'}
                  ],
                    selectedOption: {id: '-1'} //This sets the default value of the select in the ui
                };

          function Init () {
                      
            $ctrl_co.defaultparams.type_accion="search_edificio_planta_dpto";
            defaultdataFactory.buscar_edificio_planta_dpto($ctrl_co.defaultparams).then(function(d) {                            
                
              $ctrl_co.data_edificio = {
                availableOptions: d.edificio,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

              $ctrl_co.data_planta = {
                  availableOptions: d.planta,
                  selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

              $ctrl_co.data_dpto = {
                  availableOptions: d.dpto,
                  selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };
        
            }).catch(function (err) {
                  console.log(err);
              });         
          };    

    //-------------------------------------------------------------------------------------------------  
    function upDate () { 
    }

    function CerrarOperacion () {              
        //$ctrl_co.allow_disable=true;

        $ctrl_co.objDataCerrarOperacion.type_accion="cerrar_operacion";
   
        $ctrl_co.objDataCerrarOperacion.id_edificio=$ctrl_co.data_edificio.selectedOption.id;
        $ctrl_co.objDataLlamado.id_planta=$ctrl_co.data_planta.selectedOption.id;
        $ctrl_co.objDataLlamado.id_dpto=$ctrl_co.data_dpto.selectedOption.id;

        CerrarOperacionFactory.cerrarOperacion($ctrl_co.objDataCerrarOperacion).then(function(d) {                   
                $ctrl_co.Mensaje=d.Mensaje;
                //$ctrl_co.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_co.allow_disable=false;
         });                
    };

    Init();

    }// DataSendController

})(window.angular);