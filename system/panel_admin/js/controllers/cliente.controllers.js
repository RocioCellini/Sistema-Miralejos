(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoCliente", NuevoCliente);
  
  NuevoCliente.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "clienteDataFactory", "defaultdataFactory", "$filter"];

    //Controller
    function NuevoCliente ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, clienteDataFactory, defaultdataFactory, $filter) {
                                   
        var $ctrl_nc = this;

        $ctrl_nc.datalocalidad2={};
        $ctrl_nc.objDataCliente={};
        $ctrl_nc.defaultparams={};
        $ctrl_nc.allow_disable=false;
        $ctrl_nc.allow_visible=true;
                     
         // For Modal
        $ctrl_nc.itemsModals=[];
        $ctrl_nc.itemWarning=[];
        $ctrl_nc.animationsEnabled=true;
         
        $ctrl_nc.Init = Init;
        $ctrl_nc.upDate = upDate;
        $ctrl_nc.NuevoCliente=NuevoCliente;        

        $ctrl_nc.data = {
          availableOptions: [
            {id: '-1', name: 'Seleccionar'},
            {id: '0', name: 'No'},
            {id: '1', name: 'Si'}
          ],
            selectedOption: {id: '-1'} //This sets the default value of the select in the ui
        };


        function Init () {
                    
          $ctrl_nc.defaultparams.type_accion="search_provincialocalidad";
          defaultdataFactory.buscarProvinciaLocalidad($ctrl_nc.defaultparams).then(function(d) {    
    

            $ctrl_nc.datalocalidad2=d.localidad;


            $ctrl_nc.dataprovincia = {
                availableOptions: d.provincia,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

            $ctrl_nc.datalocalidad = {
                availableOptions: d.localidad,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

         }).catch(function (err) {
              console.log(err);
         });                
          
        };    

      //-------------------------------------------------------------------------------------------------  

        function upDate (objprov) { 

           $ctrl_nc.datalocalidad.availableOptions = $filter('filter')($ctrl_nc.datalocalidad2 ,{id_provincia:objprov.id});
           $ctrl_nc.datalocalidad.selectedOption={id: $ctrl_nc.datalocalidad.availableOptions[0].id};                                                                         
      }


      function NuevoCliente () {
                
          //$ctrl_nc.allow_disable=true;

          $ctrl_nc.objDataCliente.type_accion="nuevo_cliente";
     
          $ctrl_nc.objDataCliente.id_provincia=$ctrl_nc.dataprovincia.selectedOption.id;
          $ctrl_nc.objDataCliente.id_localidad=$ctrl_nc.datalocalidad.selectedOption.id;
          $ctrl_nc.objDataCliente.conoce=$ctrl_nc.data.selectedOption.id;

          clienteDataFactory.nuevoCliente($ctrl_nc.objDataCliente).then(function(d) {                   
                  $ctrl_nc.Mensaje=d.Mensaje;
                  //$ctrl_nc.allow_disable=false;
      
           }).catch(function (err) {
                console.log(err);
                //$ctrl_nc.allow_disable=false;
           });                

      };     

      Init();

    }// DataSendController

    function BuscarCliente ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, clienteDataFactory, $filter) {

        $ctrl_bc=this;
        $ctrl_bc.objDataCliente={};        
        $ctrl_bc.Buscar=Buscar;

        function Buscar() {

          $ctrl_bc.objDataCliente.type_accion="buscar_cliente";

          clienteDataFactory.buscarCliente($ctrl_bc.objDataCliente).then(function(d) {                   
                  $ctrl_bc.Mensaje=d.Mensaje;     
      
           }).catch(function (err) {
                console.log(err);          
           });                
      };
    }

})(window.angular);