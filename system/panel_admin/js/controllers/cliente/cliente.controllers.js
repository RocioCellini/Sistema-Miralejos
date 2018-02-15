(function(_angular){

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Cliente", Cliente);
  
  Cliente.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "clienteFactory", "defaultdataFactory", "$filter", "$location"];

    //Controller
    function Cliente ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, clienteFactory, defaultdataFactory, $filter, $location){
                                   
       var path = $location.path();
       //console.log(path);

        var $ctrl_c = this;

        $ctrl_c.datalocalidad2={};
        $ctrl_c.objDataCliente={};
        $ctrl_c.defaultparams={};
        $ctrl_c.allow_disable=false;
        $ctrl_c.allow_visible=true;       
         
        $ctrl_c.Init = Init;
        $ctrl_c.upDate = upDate;
        $ctrl_c.NuevoCliente=NuevoCliente;     

        //for combos
        $ctrl_c.comboDisable=false;
        $ctrl_c.comboProvHide=false;   

        $ctrl_c.data = {
          availableOptions: [
            {id: '-1', name: 'Seleccionar'},
            {id: '0', name: 'No'},
            {id: '1', name: 'Si'}
          ],
            selectedOption: {id: '-1'} 
        };

        $ctrl_c.tipo_cliente = {
          availableOptions: [
            {id: '-1', tipo: 'Seleccionar'},
            {id: '0', tipo: 'Comprador'},
            {id: '1', tipo: 'Propietario'}
          ],
            selectedOption: {id: '-1'} 
        };


        function Init () {
                    
            $ctrl_c.defaultparams.type_accion="search_data_combos";
            defaultdataFactory.buscar_datos_combos($ctrl_c.defaultparams).then(function(d){    
    
            //console.log(d);

            $ctrl_c.datalocalidad2=d.localidad;

            $ctrl_c.dataprovincia = {
                availableOptions: d.provincia,
                selectedOption: {id: '1'} 
              };

            $ctrl_c.datalocalidad = {
                availableOptions: d.localidad,
                selectedOption: {id: '1'} 
              };

            $ctrl_c.actividad = {
                availableOptions: d.actividad,
                selectedOption: {id: '1'} 
              };//This sets the default value of the select in the ui

         }).catch(function (err) {
              console.log(err);
            });

         } // Init()            
          
    

      //-------------------------------------------------------------------------------------------------  

        function upDate (objprov) { 
           $ctrl_c.datalocalidad.availableOptions = $filter('filter')($ctrl_c.datalocalidad2 ,{id_provincia:objprov.id});
           $ctrl_c.datalocalidad.selectedOption={id: $ctrl_c.datalocalidad.availableOptions[0].id};                                                                         
           //$ctrl_c.actividad.selectedOption={id: $ctrl_c.actividad.availableOptions[0].id};                                                                         
       }


      function NuevoCliente(){
                
          //$ctrl_c.allow_disable=true;

          $ctrl_c.objDataCliente.type_accion="nuevo_cliente";
     
          $ctrl_c.objDataCliente.id_provincia=$ctrl_c.dataprovincia.selectedOption.id;
          $ctrl_c.objDataCliente.id_localidad=$ctrl_c.datalocalidad.selectedOption.id;
          $ctrl_c.objDataCliente.id_actividad=$ctrl_c.actividad.selectedOption.id;
          $ctrl_c.objDataCliente.conoce=$ctrl_c.data.selectedOption.id;

          //console.log($ctrl_c.objDataCliente); bien

          clienteFactory.nuevoCliente($ctrl_c.objDataCliente).then(function(d) {                   
                  $ctrl_c.Mensaje=d.Mensaje;
                  //$ctrl_c.allow_disable=false;

                  console.log('JSON: '+d);
      
           }).catch(function (err) {
                console.log(err);
                //$ctrl_c.allow_disable=false;
           });               
      }   //NuevoCliente

    Init();

   }// DataSendController

  } //con esta llave muestra los errores

})(window.angular);