(function(_angular) {

  "use strict";

  var app = _angular.module("GestionVentas");

  app.controller("Llamado", Llamado);
  
  Llamado.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "llamadoFactory", "defaultdataFactory", "clienteFactory", "NgTableParams", "$filter", "formLoginFactory"];

  //Controller
  function Llamado ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, llamadoFactory, defaultdataFactory, clienteFactory, NgTableParams, $filter, formLoginFactory) {
                                 
     var $ctrl = this;
     
     $ctrl.defaultparams = {};
     $ctrl.objDataLlamado = {
        criterio:""
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

        $ctrl.Init = Init;
        $ctrl.upDateProvincia = upDateProvincia;       
        $ctrl.upDateEdificio = upDateEdificio;
        $ctrl.upDatePlanta = upDatePlanta;
        $ctrl.Save = Save;
        $ctrl.BuscarCliente = BuscarCliente;
        $ctrl.CompletarDatos = CompletarDatos;


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

            $ctrl.Titulo="Nuevo Llamado";
            $ctrl.objDataLlamado.type_accion="nuevo_llamado";

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
                  selectedOption: {id: '1'} //This sets the default value of the select in the ui

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
                  selectedOption: {id_origen_dato: '1'} 
              };    
              
              $ctrl.data_origen_dato.availableOptions.unshift({id_origen_dato:-1, origen_dato:'Seleccionar'});
              $ctrl.data_origen_dato.selectedOption.id_origen_dato=-1;   

              if( $stateParams.type_ingreso==="GestionVentas.modificarLlamado" ) {

                  $ctrl.Titulo="Modificar Llamado";
                  $ctrl.objDataLlamado=$stateParams.objdata;

                  console.log($stateParams.objdata);

                  $ctrl.dataprovincia.selectedOption.id=$ctrl.objDataLlamado.id_provincia;
                  $ctrl.datalocalidad.selectedOption.id=$ctrl.objDataLlamado.id_localidad;
                  $ctrl.data_vendedor.selectedOption.id=$ctrl.objDataLlamado.id_vendedor;
                  $ctrl.data_edificio.selectedOption.id_edificio=$ctrl.objDataLlamado.id_edificio;
                  $ctrl.data_planta.selectedOption.id_planta=$ctrl.objDataLlamado.id_planta;   
                  $ctrl.data_dpto.selectedOption.id_dpto=$ctrl.objDataLlamado.id_dpto; 
                  $ctrl.grado_interes.selectedOption.id=$ctrl.objDataLlamado.grado_interes-1; 

                  $ctrl.objDataLlamado.dt1 = $ctrl.objDataLlamado.fecha_llamado; 
                  $ctrl.objDataLlamado.dt2 = $ctrl.objDataLlamado.fecha_origen_dato; 
                  $ctrl.objDataLlamado.time = $ctrl.objDataLlamado.hora_llamado;  

                  
                  $ctrl.data_origen_dato.selectedOption.id_origen_dato=$ctrl.objDataLlamado.id_origen_dato;   

                  $ctrl.objDataLlamado.type_accion="editar_llamado";

              }


            }).catch(function (err) {
                console.log(err);
            });          

      };    


      
      //upDate
      //*****************************************************************************//

      function upDateProvincia (obj_prov) { 

            if(obj_prov.id!==-1) {

                $ctrl.combo_ciudad=false;

                $ctrl.datalocalidad.availableOptions = $filter('filter')($ctrl.datalocalidad2 ,{id_provincia:obj_prov.id});
                $ctrl.datalocalidad.selectedOption={id: $ctrl.datalocalidad.availableOptions[0].id}; 

                $ctrl.datalocalidad.availableOptions.unshift({id:-1, name:'Seleccionar'});
                $ctrl.datalocalidad.selectedOption.id=-1;

                } else {

                    $ctrl.combo_ciudad=true;
              }                                                                         
          }

      function upDateEdificio(obj_edificio) { 

          console.log(obj_edificio);

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
      $ctrl.dt1 = new Date(year, month, day)
    };

    $ctrl.open2 = function() {
      $ctrl.popup2.opened = true;
    };

    $ctrl.setDate = function(year, month, day) {
      $ctrl.dt2 = new Date(year, month, day)
    };

    $ctrl.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
    $ctrl.format = $ctrl.formats[1];
    $ctrl.altInputFormats = ['dd/MM/yyyy'];


    // Searching data        
    //**********************************************************************************************//  
    function BuscarCliente (valorIngresado) {     
         
        $ctrl.Mensaje="";
        $ctrl.boton_submmit=true;

        $ctrl.objDataLlamado.type_accion="buscar_cliente";              
        $ctrl.objDataLlamado.id_provincia=$ctrl.dataprovincia.selectedOption.id;
        $ctrl.objDataLlamado.id_localidad=$ctrl.datalocalidad.selectedOption.id;

        $ctrl.objDataLlamado.criterio=valorIngresado;

        console.log($ctrl.objDataLlamado);
          
        clienteFactory.buscarCliente($ctrl.objDataLlamado).then(function(d) {

        //console.log('JSON: '+d);
        //console.log(d.Respuesta);

        angular.isDefined(d.Respuesta[0].Mensaje)?ShowMessage(d):LoadTable(d);
              
                function LoadTable (d) {
                   $ctrl.tableParams.settings({dataset: d.Respuesta})
                }

                function ShowMessage (d) { 
                    $ctrl.Mensaje=d.Respuesta[0].Mensaje;
                }      

         console.log('Datos enviados a tableParams: '+d.Respuesta); 

        $ctrl.boton_submmit=false;      

        }).catch(function (err) {
            
            $ctrl.boton_submmit=false;
            $ctrl.Mensaje="Intente Mas Tarde";  
            console.log(err);

        });
                   
    };


    // Get Cliente
    //**********************************************************************************************//

      function CompletarDatos(row) {             
            
        $ctrl.objDataLlamado.id_cliente=row.id_cliente;
        $ctrl.objDataLlamado.contacto= row.apellido +" ,"+ row.nombre;

      };


    //New Call
    //*****************************************************************************//

    function Save() {
                
        //$ctrl.allow_disable=true;

        $ctrl.objDataLlamado.type_accion = "nuevo_llamado";

        $ctrl.objDataLlamado.fecha_llamado = $filter('date')($ctrl.objDataLlamado.dt1, 'yyyy-MM-dd'); 
        $ctrl.objDataLlamado.fecha_origen_dato = $filter('date')($ctrl.objDataLlamado.dt2, 'yyyy-MM-dd'); 
        $ctrl.objDataLlamado.hora_llamado = $filter('date')($ctrl.objDataLlamado.time, 'HH:mm:ss'); 

        $ctrl.objDataLlamado.id_cliente=1;

        $ctrl.objDataLlamado.id_vendedor=$ctrl.data_vendedor.selectedOption.id;

        $ctrl.objDataLlamado.id_edificio = $ctrl.data_edificio.selectedOption.id_edificio;
        $ctrl.objDataLlamado.id_planta = $ctrl.data_planta.selectedOption.id_planta;
        $ctrl.objDataLlamado.id_dpto = $ctrl.data_dpto.selectedOption.id_dpto;

        $ctrl.objDataLlamado.grado_interes=$ctrl.grado_interes.selectedOption.id;
        $ctrl.objDataLlamado.id_origen_dato = $ctrl.data_origen_dato.selectedOption.id_origen_dato; 
         
        llamadoFactory.nuevoLlamado($ctrl.objDataLlamado).then(function(d) {                   
                $ctrl.Mensaje = d.Mensaje;
                //$ctrl.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl.allow_disable=false;
         });      
      
    };
      
    Init();

  }// DataSendController

})(window.angular);