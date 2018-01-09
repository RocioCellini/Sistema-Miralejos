(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoCliente", NuevoCliente);
  
  NuevoCliente.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "clienteDataFactory", "defaultdataFactory"];

          //Controller
          function NuevoCliente ($scope, $sce, $state,  $stateParams,  $window,
           $uibModal, $document, clienteDataFactory, defaultdataFactory) {
                                         
                 var $ctrl_nc = this;
                 
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
                              
                                          
                        
                      $ctrl_nc.dataprovincia = {
                          availableOptions: d.provincia,
                          selectedOption: {id: '1'} //This sets the default value of the select in the ui
                     };
                
                     }).catch(function (err) {
                          console.log(err);
                     });                

             
          };    
    
        

    //-------------------------------------------------------------------------------------------------  
    function upDate () { 


    }


    function NuevoCliente () {
              
              //$ctrl_nc.allow_disable=true;

              $ctrl_nc.objDataCliente.type_accion="nuevo_cliente";
         
              $ctrl_nc.objDataCliente.id_provincia=$ctrl_nc.dataprovincia.selectedOption.id;
              $ctrl_nc.objDataCliente.id_localidad=5;
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

})(window.angular);