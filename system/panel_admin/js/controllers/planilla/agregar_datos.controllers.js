(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("AgregarDatos", AgregarDatos);
  
  AgregarDatos.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "AgregarDatosFactory", "defaultdataFactory", "clienteFactory", "NgTableParams", "$filter"];

    //Controller
    function AgregarDatos ($scope, $sce, $state, $stateParams, $window,
     $uibModal, $document, AgregarDatosFactory, defaultdataFactory, clienteFactory, NgTableParams, $filter) {
                                   
          var $ctrl_ad = this;

          $ctrl_ad.defaultparams = {};
          $ctrl_ad.objAgregarDatos={
           criterio:""
          };

          $ctrl_ad.allow_disable = false;
          $ctrl_ad.allow_visible = true;
          $ctrl_ad.datalocalidad2={};

          $ctrl_ad.combo_ciudad=true;
          $ctrl_ad.boton_submmit=false;   

          $ctrl_ad.popup1 = {
            opened: false
          };
          $ctrl_ad.popup2 = {
            opened: false
          };

          $ctrl_ad.CurrentDate = new Date();

          $ctrl_ad.grado_interes = {
          availableOptions: [
            {id: '-1', name: 'Seleccionar'},
            {id: '0', name: '1'},
            {id: '1', name: '2'},
            {id: '2', name: '3'},
            {id: '3', name: '4'}
            ],
              selectedOption: {id: '-1'} 
          };
      
          $ctrl_ad.Init = Init;
          $ctrl_ad.NuevaFila=NuevaFila;      
          $ctrl_ad.upDateEdificio = upDateEdificio;
          $ctrl_ad.upDatePlanta = upDatePlanta;
          $ctrl_ad.BuscarCliente = BuscarCliente;
          $ctrl_ad.CompletarDatos = CompletarDatos;

          $ctrl_ad.Init();

          // To configure table   
          //*****************************************************************************//    

            var initialParams = {
              count: 10 // initial page size
            };

            var initialSettings = {
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2
            };         

          function Init () {

              $ctrl_ad.tableParams = new NgTableParams(initialParams, initialSettings); 

              $ctrl_ad.defaultparams.type_accion="combos_agregar_datos";
              defaultdataFactory.buscar_datos_combos($ctrl_ad.defaultparams).then(function(d){    

              $ctrl_ad.datalocalidad2=d.localidad;

              $ctrl_ad.dataprovincia = {
                  availableOptions: d.provincia,
                  selectedOption: {id: '1'} 
                };

              $ctrl_ad.dataprovincia.availableOptions.unshift({id:-1, name:'Seleccionar'});
              $ctrl_ad.dataprovincia.selectedOption.id=-1; 

              $ctrl_ad.datalocalidad = {
                  availableOptions: d.localidad,
                  selectedOption: {id: '1'} 
                };

              $ctrl_ad.datalocalidad.availableOptions.unshift({id:-1, name:'Seleccionar'});
              $ctrl_ad.datalocalidad.selectedOption.id=-1;     

              $ctrl_ad.data_edificio = {
                availableOptions: d.edificio,
                selectedOption: {id: '1'} 
              };

              $ctrl_ad.data_edificio.availableOptions.unshift({id:-1, nombre:'Seleccionar'});
              $ctrl_ad.data_edificio.selectedOption.id=-1;     


               $ctrl_ad.data_origen_dato = {
                  availableOptions: d.origen_dato,
                  selectedOption: {id: '1'} 
              };    
              
              $ctrl_ad.data_origen_dato.availableOptions.unshift({id:-1, origen_dato:'Seleccionar'});
              $ctrl_ad.data_origen_dato.selectedOption.id=-1;   

            }).catch(function (err) {
                console.log(err);
              });
          }

          //upDate
          //*****************************************************************************//

          function upDateEdificio(obj_edificio) { 

              console.log(obj_edificio);

              $ctrl_ad.defaultparams.type_accion = "relacion_edificio_planta_dpto";

             // Objecto edificio contiene la propiedad ID seleccionada en ese momento por el usuario.
              $ctrl_ad.defaultparams.id_edificio = obj_edificio.id_edificio;

              defaultdataFactory.relacion_edificio_planta_dpto($ctrl_ad.defaultparams).then(function(d) {                            
                        

              $ctrl_ad.data_planta = {
                  availableOptions: d.plantas,
                  selectedOption: {id_planta: d.plantas[0].id_planta} 
              };

              $ctrl_ad.data_dpto = {
                  availableOptions: d.plantas[0].dptos, 
                  selectedOption: {id_dpto: d.plantas[0].dptos[0].id_dpto}
              };        

            }).catch(function (err) {
                  console.log(err);
              });         
          }

        function upDatePlanta (obj_planta) {

            $ctrl_ad.data_dpto = {
                  availableOptions: obj_planta.dptos, 
                  selectedOption: {id_dpto: obj_planta.dptos[0].id_dpto}
              };                                                                     
          }

        //Show calendary
        //*****************************************************************************//    

        $ctrl_ad.open1 = function() {
          $ctrl_ad.popup1.opened = true;
        };

        $ctrl_ad.setDate = function(year, month, day) {
          $ctrl_ad.dt1 = new Date(year, month, day)
        };

        $ctrl_ad.open2 = function() {
          $ctrl_ad.popup2.opened = true;
        };

        $ctrl_ad.setDate = function(year, month, day) {
          $ctrl_ad.dt2 = new Date(year, month, day)
        };

        $ctrl_ad.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
        $ctrl_ad.format = $ctrl_ad.formats[1];
        $ctrl_ad.altInputFormats = ['dd/MM/yyyy'];


        // Searching data        
        //**********************************************************************************************//  
        function BuscarCliente (valorIngresado) {     
            
            //console.log(valorIngresado);   

            $ctrl_ad.boton_submmit=true;

            $ctrl_ad.objAgregarDatos.type_accion="buscar_cliente";              
            $ctrl_ad.objAgregarDatos.id_provincia=$ctrl_ad.dataprovincia.selectedOption.id;
            $ctrl_ad.objAgregarDatos.id_localidad=$ctrl_ad.datalocalidad.selectedOption.id;

            $ctrl_ad.objAgregarDatos.criterio=valorIngresado;

            console.log($ctrl_ad.objAgregarDatos);
              
            clienteFactory.buscarCliente($ctrl_ad.objAgregarDatos).then(function(d) {

            //console.log('JSON: '+d);
            console.log(d.Respuesta);
           
            $ctrl_ad.tableParams.settings({dataset: d.Respuesta});   

                // console.log('Datos enviados a tableParams: '+d.Respuesta); 

            $ctrl_ad.boton_submmit=false;      

            }).catch(function (err) {
                console.log(err);
            });
                       
        };


        // Get Cliente
        //**********************************************************************************************//

          function CompletarDatos(row) {   

          console.log(row);          
                
            $ctrl_ad.objAgregarDatos.id_cliente= row.id_cliente;
            $ctrl_ad.objAgregarDatos.contacto= row.apellido +" ,"+ row.nombre;
            $ctrl_ad.objAgregarDatos.tipo_cliente= row.tipo_cliente;
            $ctrl_ad.objAgregarDatos.telefono1= row.telefono1;
            $ctrl_ad.objAgregarDatos.telefono2= row.telefono2;
            $ctrl_ad.objAgregarDatos.email= row.email;
            $ctrl_ad.objAgregarDatos.provincia= row.provincia;
            $ctrl_ad.objAgregarDatos.localidad= row.localidad;
            $ctrl_ad.objAgregarDatos.actividad= row.actividad;
            $ctrl_ad.objAgregarDatos.conoce= row.conoce;

          };


        //New Row
        //*****************************************************************************//

          function NuevaFila() {
              
            //$ctrl_ad.allow_disable=true;

            $ctrl_ad.objAgregarDatos.type_accion="nueva_fila";
         
            AgregarDatosFactory.nuevaFila($ctrl_ad.objAgregarDatos).then(function(d) {  
                               
                    $ctrl_ad.Mensaje=d.Mensaje;
                    //$ctrl_ad.allow_disable=false;
        
             }).catch(function (err) {
                  console.log(err);
                  //$ctrl_ad.allow_disable=false;
             });                    
        };

      Init();

     }// DataSendController

})(window.angular);