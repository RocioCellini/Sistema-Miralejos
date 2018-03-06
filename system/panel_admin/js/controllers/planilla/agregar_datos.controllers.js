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

          $ctrl_ad.tipo_cliente = {
          availableOptions: [
            {id: '-1', name: 'Seleccionar'},
            {id: '0', name: 'Comprador'},
            {id: '1', name: 'Propietario'}
            ],
              selectedOption: {id: '-1'} 
          };

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

          $ctrl_ad.origen_dato = {
          availableOptions: [
              {id: '-1', name: 'Seleccionar'},
              {id: '0', name: 'Letrero'},
              {id: '1', name: 'Oficina'},
              {id: '2', name: 'w p.p'},
              {id: '3', name: 'Temp L Lopez'},
              {id: '4', name: 'Ex AA'},
              {id: '5', name: 'Inm. Chaves'},
              {id: '6', name: 'Grupo Miralejos'},
              {id: '7', name: 'Cesión'},
              {id: '8', name: 'Eliseo'},
              {id: '9', name: 'Comincini'},
              {id: '10', name: 'Pablo'},
              {id: '11', name: 'Piloni'},
              {id: '12', name: 'Armesto'},
              {id: '13', name: 'Cernotto'},
              {id: '14', name: 'Temp Fa'},
              {id: '15', name: 'Churrasquita'},
              {id: '16', name: 'Guven'},
              {id: '17', name: 'D. Sandrone'},
              {id: '18', name: 'S. Gomez'},
              {id: '19', name: 'T Piovano'},
              {id: '20', name: 'Cravero S - Eliseo'},
              {id: '21', name: 'A Cismondi'}
            ],
              selectedOption: {id: '-1'} 
          };

      
          $ctrl_ad.Init = Init;
          $ctrl_ad.NuevaFila=NuevaFila;
          $ctrl_ad.upDateProvincia = upDateProvincia;       
          $ctrl_ad.upDateEdificio = upDateEdificio;
          $ctrl_ad.upDatePlanta = upDatePlanta;
          $ctrl_ad.BuscarCliente = BuscarCliente;

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

              $ctrl_ad.defaultparams.type_accion="buscar_datos_llamado";
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
                selectedOption: {id_edificio: '1'} 
              };

            }).catch(function (err) {
                console.log(err);
              });
          }

          //upDate
          //*****************************************************************************//

          function upDateProvincia (obj_prov) { 

                if(obj_prov.id!==-1) {

                    $ctrl_ad.combo_ciudad=false;

                    $ctrl_ad.datalocalidad.availableOptions = $filter('filter')($ctrl_ad.datalocalidad2 ,{id_provincia:obj_prov.id});
                    $ctrl_ad.datalocalidad.selectedOption={id: $ctrl_ad.datalocalidad.availableOptions[0].id}; 

                    $ctrl_ad.datalocalidad.availableOptions.unshift({id:-1, name:'Seleccionar'});
                    $ctrl_ad.datalocalidad.selectedOption.id=-1;

                    } else {

                        $ctrl_ad.combo_ciudad=true;
                  }                                                                         
              }

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