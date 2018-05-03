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
        $ctrl.Save=Save;    

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

            $ctrl.Titulo="Nuevo Contacto";
            $ctrl.objDataCliente.type_accion="nuevo_cliente";
          
            formLoginFactory.checkSession( $ctrl.objLogin ).then( function( d ) {

               angular.isDefined(d.setUrl)?goUrl( d ):null;
                              
                    function goUrl ( d ) {
                         
                        $state.go( d.setUrl );
                       
                    }

            }); //d es la promise que está en el factory y devuelve el mensaje que está en el php

                    
            $ctrl.defaultparams.type_accion="search_data_combos";
            defaultdataFactory.buscar_datos_combos($ctrl.defaultparams).then (function( d ) {    

              $ctrl.datalocalidad2=d.localidad;

              $ctrl.dataprovincia = {
                  availableOptions: d.provincia,
                  selectedOption: {id: '1'} 
                };

              $ctrl.dataprovincia.availableOptions.unshift({id:-1, name:'Seleccionar'});
              $ctrl.dataprovincia.selectedOption.id=-1; 


              $ctrl.datalocalidad = {
                  availableOptions: d.localidad,
                  selectedOption: {id: '1'} 
                };

              $ctrl.datalocalidad.availableOptions.unshift({id:-1, name:'Seleccionar'});
              $ctrl.datalocalidad.selectedOption.id=-1; 

              $ctrl.actividad = {
                  availableOptions: d.actividad,
                  selectedOption: {id: '1'} 
                };

              $ctrl.actividad.availableOptions.unshift({id:-1, name:'Seleccionar'});
              $ctrl.actividad.selectedOption.id=-1; 

            
              if( $stateParams.type_ingreso==="GestionVentas.modificarCliente" ) {

                  $ctrl.Titulo="Modificar Contacto";
                  $ctrl.objDataCliente=$stateParams.objdata;

                  $ctrl.dataprovincia.selectedOption.id=$ctrl.objDataCliente.id_provincia;
                  $ctrl.datalocalidad.selectedOption.id=$ctrl.objDataCliente.id_localidad;
                  $ctrl.actividad.selectedOption.id=$ctrl.objDataCliente.id_actividad;
                  $ctrl.data.selectedOption.id=$ctrl.objDataCliente.id_conoce;  

                  $ctrl.objDataCliente.type_accion="editar_cliente";

              }

              if( $stateParams.type_ingreso==="GestionVentas.eliminarCliente" ) {                       

                  $ctrl.objDataCliente.type_accion="eliminar_cliente";

                  $ctrl.dataprovincia.selectedOption.id=-1; 
                  $ctrl.datalocalidad.selectedOption.id=-1;

                  const metodo=$stateParams.type_ingreso.split(".");          
                          
                  clienteFactory[metodo[1]]( $ctrl.objDataCliente ).then(function(d) { 

                  $ctrl.Mensaje=d.Mensaje;
              
                   }).catch(function (err) {
                        console.log(err);
                   });   
              }

           }).catch(function (err) {
                console.log(err);
           });

        } // Fin Init()            
 

        function upDate (objprov) { 

             $ctrl.datalocalidad.availableOptions = $filter('filter')($ctrl.datalocalidad2 ,{id_provincia:objprov.id});
             $ctrl.datalocalidad.selectedOption={id: $ctrl.datalocalidad.availableOptions[0].id};                                                                         
             //$ctrl.actividad.selectedOption={id: $ctrl.actividad.availableOptions[0].id}; 
                                                                                     
        }//Fin upDate()


        function Save () {
                           
            $ctrl.objDataCliente.id_provincia=$ctrl.dataprovincia.selectedOption.id;
            $ctrl.objDataCliente.id_localidad=$ctrl.datalocalidad.selectedOption.id;
            $ctrl.objDataCliente.id_actividad=$ctrl.actividad.selectedOption.id;
            $ctrl.objDataCliente.conoce=$ctrl.data.selectedOption.id;

            //ES6 La variable CONST
            const metodo=$stateParams.type_ingreso.split(".");
           
            /*clienteFactory[modificarCliente] Es para acceder a la propiedad de un Object mediante variable, 
            de forma implícita, sin aclarar cuál es el nombre de dicha propiedad*/
                    
            clienteFactory[metodo[1]]( $ctrl.objDataCliente ).then(function(d) {   

            $ctrl.Mensaje=d.Mensaje;
        
             }).catch(function (err) {
                  console.log(err);
             });   
            
        }//Fin Save()

    Init();

   }// DataSendController

})(window.angular);