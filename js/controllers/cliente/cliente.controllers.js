(function(_angular){

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Cliente", Cliente);
  
  Cliente.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "clienteFactory", "defaultdataFactory", "$filter", "$location", "formLoginFactory"];

    //Controller
    function Cliente ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, clienteFactory, defaultdataFactory, $filter, $location, formLoginFactory ){
                                   
       var path = $location.path();
       //console.log(path);

        var $ctrl = this;


          $ctrl.objLogin ={};

          Object.defineProperty ( $ctrl.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
          }); // Esto hace que la propiedad type_accion no se pueda modificar


        $ctrl.datalocalidad2={};
        $ctrl.objDataCliente={};
        $ctrl.defaultparams={};
        $ctrl.allow_disable=false;
        $ctrl.allow_visible=true;       
         
        $ctrl.Init = Init;
        $ctrl.upDate = upDate;
        $ctrl.NuevoCliente=NuevoCliente;    

        //for combos
        $ctrl.comboDisable=false;
        $ctrl.comboProvHide=false;   

        $ctrl.data = {
          availableOptions: [
            {id: '-1', name: 'Seleccionar'},
            {id: '0', name: 'No'},
            {id: '1', name: 'Si'}
          ],
            selectedOption: {id: '-1'} 
        };

        function Init () {


        
        formLoginFactory.checkSession( $ctrl.objLogin ).then( function( d ) {

                       angular.isDefined(d.setUrl)?goUrl( d ):null;
                                      
                            function goUrl ( d ) {
                                 
                                $state.go( d.setUrl );
                               
                            }
                        

        }); //d es la promise que está en el factory y devuelve el mensaje que está en el php


                    
            $ctrl.defaultparams.type_accion="search_data_combos";
            defaultdataFactory.buscar_datos_combos($ctrl.defaultparams).then(function(d){    

            $ctrl.datalocalidad2=d.localidad;

            $ctrl.dataprovincia = {
                availableOptions: d.provincia,
                selectedOption: {id: '1'} 
              };

            $ctrl.datalocalidad = {
                availableOptions: d.localidad,
                selectedOption: {id: '1'} 
              };

            $ctrl.actividad = {
                availableOptions: d.actividad,
                selectedOption: {id: '1'} 
              };//This sets the default value of the select in the ui

         }).catch(function (err) {
              console.log(err);
            });

         } // Init()            
          
    

      //-------------------------------------------------------------------------------------------------  

        function upDate (objprov) { 
           $ctrl.datalocalidad.availableOptions = $filter('filter')($ctrl.datalocalidad2 ,{id_provincia:objprov.id});
           $ctrl.datalocalidad.selectedOption={id: $ctrl.datalocalidad.availableOptions[0].id};                                                                         
           //$ctrl.actividad.selectedOption={id: $ctrl.actividad.availableOptions[0].id};                                                                         
       }


      function NuevoCliente(){
                
          //$ctrl.allow_disable=true;

          $ctrl.objDataCliente.type_accion="nuevo_cliente";
     
          $ctrl.objDataCliente.id_provincia=$ctrl.dataprovincia.selectedOption.id;
          $ctrl.objDataCliente.id_localidad=$ctrl.datalocalidad.selectedOption.id;
          $ctrl.objDataCliente.id_actividad=$ctrl.actividad.selectedOption.id;
          $ctrl.objDataCliente.conoce=$ctrl.data.selectedOption.id;

          clienteFactory.nuevoCliente($ctrl.objDataCliente).then(function(d) {   

                  $ctrl.Mensaje=d.Mensaje;

                  //console.log('JSON: '+d);
      
           }).catch(function (err) {
                console.log(err);
           });   

      }//Fin NuevoCliente

    Init();

   }// DataSendController

})(window.angular);