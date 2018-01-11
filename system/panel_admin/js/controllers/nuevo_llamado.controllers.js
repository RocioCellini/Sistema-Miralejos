(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoLlamado", NuevoLlamado);
  
  NuevoLlamado.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "llamadoFactory"];

  //Controller
  function NuevoLlamado ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, llamadoFactory) {
                                 
     var $ctrl_nl = this;
     
     $ctrl_nl.objDataLlamado={};
     $ctrl_nl.allow_disable=false;
     $ctrl_nl.allow_visible=true;

    
     $ctrl_nl.Init = Init;
     $ctrl_nl.upDate = upDate;
     $ctrl_nl.NuevoLlamado=NuevoLlamado;

      $ctrl_nl.data = {
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

            $ctrl_nl.defaultparams.type_accion="search_edificio_dpto";
            defaultdataFactory.buscar_edificio_dpto($ctrl_nl.defaultparams).then(function(d) {                            
              
            $ctrl_nl.data_edificio = {
                availableOptions: d.edificio,
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
        
        llamadoFactory.nuevoLlamado($ctrl_nl.objDataLlamado).then(function(d) {                   
                $ctrl_nl.Mensaje=d.Mensaje;
                //$ctrl_nl.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_nl.allow_disable=false;
         });                
      };
      
     Init();

  }// DataSendController

})(window.angular);