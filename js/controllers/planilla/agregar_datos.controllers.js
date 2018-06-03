(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("AgregarDatos", AgregarDatos);
  
  AgregarDatos.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "AgregarDatosFactory", "defaultdataFactory", "clienteFactory", "llamadoFactory", "NgTableParams", "$filter", "formLoginFactory"];

    //Controller
    function AgregarDatos ($scope, $sce, $state, $stateParams, $window,
     $uibModal, $document, AgregarDatosFactory, defaultdataFactory, clienteFactory, llamadoFactory, NgTableParams, $filter, formLoginFactory) {
                                   
          var $ctrl = this;

          $ctrl.defaultparams = {};
          $ctrl.objAgregarDatos={
           criterio:""
          };

          $ctrl.objDate={
          };

          $ctrl.objLogin ={};

          Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                value: "checkSession",
                writable: false,
                enumerable: true,
                configurable: false
          }); 

          $ctrl.allow_disable = false;
          $ctrl.allow_visible = true;
          $ctrl.datalocalidad2={};

          $ctrl.combo_ciudad=true;
          $ctrl.boton_submmit=false;   

          $ctrl.popup1 = {
            opened: false
          };
          $ctrl.popup2 = {
            opened: false
          };

          $ctrl.CurrentDate = new Date();

          $ctrl.grado_interes = {
          availableOptions: [
            {id: '-1', name: 'Seleccionar'},
            {id: '0', name: '1'},
            {id: '1', name: '2'},
            {id: '2', name: '3'},
            {id: '3', name: '4'}
            ],
              selectedOption: {id: '-1'} 
          };

          $ctrl.tipo_cliente = {
          availableOptions: [
            {id: '-1', tipo: 'Seleccionar'},
            {id: '0', tipo: 'Comprador'},
            {id: '1', tipo: 'Propietario'}
          ],
            selectedOption: {id: '-1'} 
        };
      
          $ctrl.Init = Init;
          $ctrl.NuevaFila = NuevaFila;    
          $ctrl.upDateProvincia = upDateProvincia;
          $ctrl.upDateEdificio = upDateEdificio;
          $ctrl.upDatePlanta = upDatePlanta;
          $ctrl.BuscarCliente = BuscarCliente;
          $ctrl.CompletarDatos = CompletarDatos;

          $ctrl.Init();// Ver si va esto

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

              $ctrl.tableParams = new NgTableParams(initialParams, initialSettings); 

              formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
              });       

              $ctrl.defaultparams.type_accion="combos_agregar_datos";
              defaultdataFactory.buscar_datos_combos($ctrl.defaultparams).then(function(d){    

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

               $ctrl.data_vendedor = {
                  availableOptions: d.vendedor,
                  selectedOption: {id: '1'} 
                };

              $ctrl.data_vendedor.availableOptions.unshift({id:-1, name:'Seleccionar'});
              $ctrl.data_vendedor.selectedOption.id=-1;  

              $ctrl.data_inmob = {
                  availableOptions: d.inmobiliaria,
                  selectedOption: {id: '1'} 
                };

              $ctrl.data_inmob.availableOptions.unshift({id:-1, name:'Seleccionar'});
              $ctrl.data_inmob.selectedOption.id=-1;    

              $ctrl.data_edificio = {
                availableOptions: d.edificio,
                selectedOption: {id_edificio: '1'} 
              };

              $ctrl.data_edificio.availableOptions.unshift({id_edificio:-1, nombre:'Seleccionar'});
              $ctrl.data_edificio.selectedOption.id_edificio=-1;  

              $ctrl.data_planta = {
                availableOptions: d.planta,
                selectedOption: {id_planta: '1'} 
              };

              $ctrl.data_planta.availableOptions.unshift({id_planta:-1, nombre:'Seleccionar'});
              $ctrl.data_planta.selectedOption.id_planta=-1;  

              $ctrl.data_dpto = {
                availableOptions: d.dpto,
                selectedOption: {id_dpto: '1'} 
              };

              $ctrl.data_dpto.availableOptions.unshift({id_dpto:-1, nombre:'Seleccionar'});
              $ctrl.data_dpto.selectedOption.id_dpto=-1;  


               $ctrl.data_origen_dato = {
                  availableOptions: d.origen_dato,
                  selectedOption: {id: '1'} 
              };    
              
              $ctrl.data_origen_dato.availableOptions.unshift({id:-1, origen_dato:'Seleccionar'});
              $ctrl.data_origen_dato.selectedOption.id=-1;   

            }).catch(function (err) {
                console.log(err);
              });
          }

          //upDate
          //*****************************************************************************//

          function upDateProvincia(objprov) { 

            if(objprov.id!==-1) {

                $ctrl.combo_ciudad=false;

                $ctrl.datalocalidad.availableOptions = $filter('filter')($ctrl.datalocalidad2 ,{id_provincia:objprov.id});
                $ctrl.datalocalidad.selectedOption={id: $ctrl.datalocalidad.availableOptions[0].id}; 

                $ctrl.datalocalidad.availableOptions.unshift({id:-1, name:'Seleccionar'});
                $ctrl.datalocalidad.selectedOption.id=-1;

                } else {

                    $ctrl.combo_ciudad=true;
              }                                                                         
          }


          function upDateEdificio(obj_edificio) { 

              //console.log(obj_edificio);

              $ctrl.defaultparams.type_accion = "relacion_edificio_planta_dpto";

             // Objecto edificio contiene la propiedad ID seleccionada en ese momento por el usuario.
              $ctrl.defaultparams.id_edificio = obj_edificio.id_edificio;

              defaultdataFactory.relacion_edificio_planta_dpto($ctrl.defaultparams).then(function(d) {                            
                        

              $ctrl.data_planta = {
                  availableOptions: d.plantas,
                  selectedOption: {id_planta: d.plantas[0].id_planta} 
              };

              $ctrl.data_dpto = {
                  availableOptions: d.plantas[0].dptos, 
                  selectedOption: {id_dpto: d.plantas[0].dptos[0].id_dpto}
              };        

            }).catch(function (err) {
                  console.log(err);
              });         
          }

        function upDatePlanta (obj_planta) {

            $ctrl.data_dpto = {
                  availableOptions: obj_planta.dptos, 
                  selectedOption: {id_dpto: obj_planta.dptos[0].id_dpto}
              };                                                                     
          }

        //Show calendary
        //*****************************************************************************//    

        $ctrl.open1 = function() {
          $ctrl.popup1.opened = true;
        };

        $ctrl.setDate = function(year, month, day) {
          $ctrl.objDate.fecha_cierre_operacion = new Date(year, month, day)
        };

        $ctrl.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
        $ctrl.format = $ctrl.formats[1];
        $ctrl.altInputFormats = ['dd/MM/yyyy'];


        // Searching data        
        //**********************************************************************************************//  
        function BuscarCliente (valorIngresado) {     
            
            //console.log(valorIngresado);   

            $ctrl.boton_submmit=true;

            $ctrl.objAgregarDatos.type_accion="buscar_cliente";              
            $ctrl.objAgregarDatos.id_provincia=$ctrl.dataprovincia.selectedOption.id;
            $ctrl.objAgregarDatos.id_localidad=$ctrl.datalocalidad.selectedOption.id;

            $ctrl.objAgregarDatos.criterio=valorIngresado;

            console.log($ctrl.objAgregarDatos);
              
            clienteFactory.buscarCliente($ctrl.objAgregarDatos).then(function(d) {
           
            $ctrl.tableParams.settings({dataset: d.Respuesta});   

            $ctrl.boton_submmit=false;      

            }).catch(function (err) {
                console.log(err);
            });
                       
        };


        // Get Cliente
        //**********************************************************************************************//

          function CompletarDatos(row) {   

          //console.log(row);          
                
            $ctrl.objAgregarDatos.id_cliente= row.id_cliente;
            $ctrl.objAgregarDatos.contacto= row.apellido +" ,"+ row.nombre;
            $ctrl.objAgregarDatos.telefono1= row.telefono1;
            $ctrl.objAgregarDatos.telefono2= row.telefono2;
            $ctrl.objAgregarDatos.email= row.email;
            $ctrl.objAgregarDatos.provincia= row.provincia;
            $ctrl.objAgregarDatos.localidad= row.localidad;
            $ctrl.objAgregarDatos.actividad= row.actividad;
            $ctrl.objAgregarDatos.conoce= row.conoce;

            $ctrl.objAgregarDatos.type_accion="detalle_llamados";    

            llamadoFactory.detalleLlamados($ctrl.objAgregarDatos).then(function(d) {

             // console.log(d.Respuesta); 

              $ctrl.objAgregarDatos.num_llamados= d.Respuesta[0].contador;  
              $ctrl.objAgregarDatos.fecha_ult_llamado= d.Respuesta[0].fecha_ult_llamado;                   
              $ctrl.objAgregarDatos.nombre_origen_dato= d.Respuesta[0].nombre_origen_dato;
              $ctrl.objAgregarDatos.fecha_origen_dato= d.Respuesta[0].fecha_origen_dato;
              $ctrl.data_vendedor.selectedOption.id=d.Respuesta[0].id_vendedor;              
              $ctrl.data_inmob.selectedOption.id=d.Respuesta[0].id_inmobiliaria;  

              $ctrl.data_edificio.selectedOption.id_edificio=d.Respuesta[0].id_edificio; 
              $ctrl.data_planta.selectedOption.id_planta=d.Respuesta[0].id_planta; 
              $ctrl.data_dpto.selectedOption.id_dpto=d.Respuesta[0].id_dpto; 

            }).catch(function (err) {
                console.log(err);
            });

          };


        //New Row
        //*****************************************************************************//

          function NuevaFila() {
              
            //$ctrl.allow_disable=true;

            var fecha_cierre_operacion=$filter('date')($ctrl.objDate.fecha_cierre_operacion, 'yyyy-MM-dd');
            
            $ctrl.objAgregarDatos.fecha_cierre_operacion=fecha_cierre_operacion;
           console.log(fecha_cierre_operacion);   

            $ctrl.objAgregarDatos.type_accion="nueva_fila";

            $ctrl.objAgregarDatos.id_provincia=$ctrl.dataprovincia.selectedOption.id;
            $ctrl.objAgregarDatos.id_localidad=$ctrl.datalocalidad.selectedOption.id;

            $ctrl.objAgregarDatos.grado_interes=$ctrl.grado_interes.selectedOption.id;
            $ctrl.objAgregarDatos.tipo_cliente=$ctrl.tipo_cliente.selectedOption.tipo;
            $ctrl.objAgregarDatos.id_vendedor=$ctrl.data_vendedor.selectedOption.id;
            $ctrl.objAgregarDatos.id_inmobiliaria=$ctrl.data_inmob.selectedOption.id;

            $ctrl.objAgregarDatos.id_edificio=$ctrl.data_edificio.selectedOption.id_edificio;
            $ctrl.objAgregarDatos.id_planta=$ctrl.data_planta.selectedOption.id_planta;
            $ctrl.objAgregarDatos.id_dpto=$ctrl.data_dpto.selectedOption.id_dpto;
         
            AgregarDatosFactory.nuevaFila($ctrl.objAgregarDatos).then(function(d) {  
                               
                    $ctrl.Mensaje=d.Mensaje;
                    //$ctrl.allow_disable=false;

                    console.log($ctrl.objAgregarDatos);

                    console.log(d.Mensaje);
        
             }).catch(function (err) {
                  console.log(err);
                  //$ctrl.allow_disable=false;
             });                    
        };

      Init();

     }// DataSendController

})(window.angular);