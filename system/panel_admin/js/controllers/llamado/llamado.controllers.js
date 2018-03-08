(function(_angular) {

  "use strict";

  var app = _angular.module("GestionVentas");

  app.controller("Llamado", Llamado);
  
  Llamado.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "llamadoFactory", "defaultdataFactory", "clienteFactory", "NgTableParams", "$filter"];

  //Controller
  function Llamado ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, llamadoFactory, defaultdataFactory, clienteFactory, NgTableParams, $filter) {
                                 
     var $ctrl_ll = this;
     
     $ctrl_ll.defaultparams = {};
     $ctrl_ll.objDataLlamado = {
        criterio:""
     };
     $ctrl_ll.allow_disable = false;
     $ctrl_ll.allow_visible = true;
     $ctrl_ll.datalocalidad2={};

     $ctrl_ll.combo_ciudad=true;
     $ctrl_ll.boton_submmit=false;   

     $ctrl_ll.popup1 = {
        opened: false
      };
      $ctrl_ll.popup2 = {
        opened: false
      };

     $ctrl_ll.CurrentDate = new Date();

     $ctrl_ll.time = {
       value: new Date(2018, 0, 1, 14, 57, 0) //nose que parámetros tiene, 14:57 es la hora que aparece por defecto
     };

     $ctrl_ll.grado_interes = {
          availableOptions: [
            {id: '-1', name: 'Seleccionar'},
            {id: '0', name: '1'},
            {id: '1', name: '2'},
            {id: '2', name: '3'},
            {id: '3', name: '4'}
          ],
            selectedOption: {id: '-1'} 
        };

        $ctrl_ll.Init = Init;
        $ctrl_ll.upDateProvincia = upDateProvincia;       
        $ctrl_ll.upDateEdificio = upDateEdificio;
        $ctrl_ll.upDatePlanta = upDatePlanta;
        $ctrl_ll.NuevoLlamado = NuevoLlamado;
        $ctrl_ll.BuscarCliente = BuscarCliente;
        
        $ctrl_ll.Init();


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
/*
      $ctrl_ll.defaultparams.type_accion = "buscar_edificio_planta_dpto";
      defaultdataFactory.buscar_edificio_planta_dpto($ctrl_ll.defaultparams).then(function(d) {                            
        
      console.log(d);

      $ctrl_ll.data_edificio = {
          availableOptions: d.edificio,
          selectedOption: {id_edificio: '1'} 
        };
  
       }).catch(function (err) {
            console.log(err);
       });  
*/
       $ctrl_ll.tableParams = new NgTableParams(initialParams, initialSettings); 

       $ctrl_ll.defaultparams.type_accion="combos_agregar_datos";
            defaultdataFactory.buscar_datos_combos($ctrl_ll.defaultparams).then(function(d){

              $ctrl_ll.datalocalidad2=d.localidad;
              
              $ctrl_ll.dataprovincia = {
                  availableOptions: d.provincia,
                  selectedOption: {id: '1'} //This sets the default value of the select in the ui

              };
             
              $ctrl_ll.dataprovincia.availableOptions.unshift({id:-1, name:'Seleccionar'});
              $ctrl_ll.dataprovincia.selectedOption.id=-1; 

              $ctrl_ll.datalocalidad = {
                  availableOptions: d.localidad,
                  selectedOption: {id: '1'} 
              };     

              $ctrl_ll.datalocalidad.availableOptions.unshift({id:-1, name:'Seleccionar'});
              $ctrl_ll.datalocalidad.selectedOption.id=-1;     

              $ctrl_ll.data_vendedor = {
                  availableOptions: d.vendedor,
                  selectedOption: {id: '1'} 
              };    

              $ctrl_ll.data_edificio = {
                availableOptions: d.edificio,
                selectedOption: {id_edificio: '1'} 
              };

              $ctrl_ll.data_origen_dato = {
                  availableOptions: d.origen_dato,
                  selectedOption: {id: '1'} 
              };    
              
              $ctrl_ll.data_origen_dato.availableOptions.unshift({id:-1, origen_dato:'Seleccionar'});
              $ctrl_ll.data_origen_dato.selectedOption.id=-1;   

            }).catch(function (err) {
                console.log(err);
            });          

      };    


      
      //upDate
      //*****************************************************************************//

      function upDateProvincia (obj_prov) { 

            if(obj_prov.id!==-1) {

                $ctrl_ll.combo_ciudad=false;

                $ctrl_ll.datalocalidad.availableOptions = $filter('filter')($ctrl_ll.datalocalidad2 ,{id_provincia:obj_prov.id});
                $ctrl_ll.datalocalidad.selectedOption={id: $ctrl_ll.datalocalidad.availableOptions[0].id}; 

                $ctrl_ll.datalocalidad.availableOptions.unshift({id:-1, name:'Seleccionar'});
                $ctrl_ll.datalocalidad.selectedOption.id=-1;

                } else {

                    $ctrl_ll.combo_ciudad=true;
              }                                                                         
          }

      function upDateEdificio(obj_edificio) { 

          console.log(obj_edificio);

          $ctrl_ll.defaultparams.type_accion = "relacion_edificio_planta_dpto";

         // Objecto edificio contiene la propiedad ID seleccionada en ese momento por el usuario.
          $ctrl_ll.defaultparams.id_edificio = obj_edificio.id_edificio;

          defaultdataFactory.relacion_edificio_planta_dpto($ctrl_ll.defaultparams).then(function(d) {                            
                    

          $ctrl_ll.data_planta = {
              availableOptions: d.plantas,
              selectedOption: {id_planta: d.plantas[0].id_planta} 
          };

          $ctrl_ll.data_dpto = {
              availableOptions: d.plantas[0].dptos, 
              selectedOption: {id_dpto: d.plantas[0].dptos[0].id_dpto}
          };        

        }).catch(function (err) {
              console.log(err);
          });         
      }

    function upDatePlanta (obj_planta) {

        $ctrl_ll.data_dpto = {
              availableOptions: obj_planta.dptos, 
              selectedOption: {id_dpto: obj_planta.dptos[0].id_dpto}
          };                                                                     
      }

    //Show calendary
    //*****************************************************************************//    

    $ctrl_ll.open1 = function() {
      $ctrl_ll.popup1.opened = true;
    };

    $ctrl_ll.setDate = function(year, month, day) {
      $ctrl_ll.dt1 = new Date(year, month, day)
    };

    $ctrl_ll.open2 = function() {
      $ctrl_ll.popup2.opened = true;
    };

    $ctrl_ll.setDate = function(year, month, day) {
      $ctrl_ll.dt2 = new Date(year, month, day)
    };

    $ctrl_ll.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
    $ctrl_ll.format = $ctrl_ll.formats[1];
    $ctrl_ll.altInputFormats = ['dd/MM/yyyy'];


    // Searching data        
    //**********************************************************************************************//  
    function BuscarCliente (valorIngresado) {     
        
        //console.log(valorIngresado);   

        $ctrl_ll.boton_submmit=true;

        $ctrl_ll.objDataLlamado.type_accion="buscar_cliente";              
        $ctrl_ll.objDataLlamado.id_provincia=$ctrl_ll.dataprovincia.selectedOption.id;
        $ctrl_ll.objDataLlamado.id_localidad=$ctrl_ll.datalocalidad.selectedOption.id;

        $ctrl_ll.objDataLlamado.criterio=valorIngresado;

        console.log($ctrl_ll.objDataLlamado);
          
        clienteFactory.buscarCliente($ctrl_ll.objDataLlamado).then(function(d) {

        //console.log('JSON: '+d);
        console.log(d.Respuesta);
       
        $ctrl_ll.tableParams.settings({dataset: d.Respuesta});   

            // console.log('Datos enviados a tableParams: '+d.Respuesta); 

        $ctrl_ll.boton_submmit=false;      

        }).catch(function (err) {
            console.log(err);
        });
                   
    };


    //New Call
    //*****************************************************************************//

    function NuevoLlamado () {
                
        //$ctrl_ll.allow_disable=true;

        $ctrl_ll.objDataLlamado.type_accion = "nuevo_llamado";

        $ctrl_ll.objDataLlamado.id_edificio = $ctrl_ll.data_edificio.selectedOption.id;
        $ctrl_ll.objDataLlamado.id_planta = $ctrl_ll.data_planta.selectedOption.id;
        $ctrl_ll.objDataLlamado.id_dpto = $ctrl_ll.data_dpto.selectedOption.id;
        
    
        clienteFactory.nuevoLlamado($ctrl_ll.objDataLlamado).then(function(d) {                   
                $ctrl_ll.Mensaje = d.Mensaje;
                //$ctrl_ll.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_ll.allow_disable=false;
         });                 
    };
      
     Init();

  }// DataSendController

})(window.angular);