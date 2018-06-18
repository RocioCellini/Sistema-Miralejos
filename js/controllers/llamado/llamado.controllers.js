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

      $ctrl.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
      $ctrl.format = $ctrl.formats[1];
      $ctrl.altInputFormats = ['dd/MM/yyyy'];

      $ctrl.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };

      $ctrl.popup1 = {
      opened: false
      };

      $ctrl.popup2 = {
      opened: false
      };

      $ctrl.popup3 = {
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
        $ctrl.Boton="Guardar";
        $ctrl.objDataLlamado.type_accion="nuevo_llamado";
        
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

          $ctrl.cierre_operacion = {
              availableOptions: d.cierre_operacion,
              selectedOption: {id_cierre_operacion: '1'} 
          };    

          $ctrl.cierre_operacion.availableOptions.unshift({id_cierre_operacion:-1, cierre_operacion:'Seleccionar'});
          $ctrl.cierre_operacion.selectedOption.id_cierre_operacion=-1; 

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
              $ctrl.cierre_operacion.selectedOption.id_cierre_operacion=$ctrl.objDataLlamado.id_cierre_operacion; 
              $ctrl.grado_interes.selectedOption.id=$ctrl.objDataLlamado.grado_interes-1; 

                
              // la funcion javascript new date () Nos pide AÑO MES Y DIA, y como obtenemos 
              // el valor de la base de datos con el - no nos sirve, javascript nos dara un error
              //entonces usamos la funcion split para obtener los valores por separado sin el - medio

              /*******************************************************************/ 
              let date1 = $ctrl.objDataLlamado.fecha_llamado.split("-");
              let date2 = $ctrl.objDataLlamado.fecha_origen_dato.split("-");                    
              let date3 = $ctrl.objDataLlamado.fecha_cierre_operacion.split("-");   

              setDate(date1[0], date1[1]-1, date1[2], "dt1");
              setDate(date2[0], date2[1]-1, date2[2], "dt2");
              setDate(date3[0], date3[1]-1, date3[2], "dt3");
                 
              // Creamos una funcion con cualquier nombre para pasar los parametros obtenidos por split.
              function setDate (year, month, day , typevar) {

                // AHORA SI! podemos crear un Obj date por que tenemos los valores como nos pide new Date ()
                // typevar es solo para aprovechar la funcion y hacer el mismo procedimiento con las tres variables
                // dt1, dt2 y dt3.   
                console.log(month);
                
                $ctrl.objDataLlamado[typevar] = new Date(year, month, day);

                //$ctrl.dt2 = new Date(year, month, day);

              };

              // Mismo caso para definir la Hora.
              
              let timedate =  $ctrl.objDataLlamado.hora_llamado.split(":");

              // NEcesitamos un Obj Date y Luego usar la funcion de javascript setHours para dar formato de hora minutos y segundos
              let valuetime = new Date();
              valuetime.setHours(timedate[0], timedate[1], timedate[2]);

              $ctrl.objDataLlamado.time = $filter('date')(valuetime, 'HH:mm:ss');

              /*******************************************************************/ 
               
              $ctrl.data_origen_dato.selectedOption.id_origen_dato=$ctrl.objDataLlamado.id_origen_dato;   

              $ctrl.objDataLlamado.type_accion="editar_llamado";

          }

          if( $stateParams.type_ingreso==="GestionVentas.eliminarLlamado" ) {                       

              $ctrl.Titulo="Eliminar Llamado";
              $ctrl.Boton="Eliminar";
              $ctrl.objDataLlamado=$stateParams.objdata;

              $ctrl.dataprovincia.selectedOption.id=$ctrl.objDataLlamado.id_provincia;
              $ctrl.datalocalidad.selectedOption.id=$ctrl.objDataLlamado.id_localidad;
              $ctrl.data_vendedor.selectedOption.id=$ctrl.objDataLlamado.id_vendedor;
              $ctrl.data_edificio.selectedOption.id_edificio=$ctrl.objDataLlamado.id_edificio;
              $ctrl.data_planta.selectedOption.id_planta=$ctrl.objDataLlamado.id_planta;   
              $ctrl.data_dpto.selectedOption.id_dpto=$ctrl.objDataLlamado.id_dpto; 

              $ctrl.cierre_operacion.selectedOption.id_cierre_operacion=$ctrl.objDataLlamado.id_cierre_operacion; 
              $ctrl.grado_interes.selectedOption.id=$ctrl.objDataLlamado.grado_interes-1; 

              $ctrl.objDataLlamado.dt1 =$stateParams.objdata.fecha_llamado;
              $ctrl.objDataLlamado.dt2 = $ctrl.objDataLlamado.fecha_origen_dato; 
              $ctrl.objDataLlamado.dt3 = $ctrl.objDataLlamado.fecha_cierre_operacion; 
              $ctrl.objDataLlamado.time = $ctrl.objDataLlamado.hora_llamado;  

              $ctrl.data_origen_dato.selectedOption.id_origen_dato=$ctrl.objDataLlamado.id_origen_dato;   

              $ctrl.objDataLlamado.type_accion="eliminar_llamado";

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

    $ctrl.open2 = function() {
      $ctrl.popup2.opened = true;
    };

    $ctrl.open3 = function() {
      $ctrl.popup3.opened = true;
    };



    // Searching data        
    //**********************************************************************************************//  
    function BuscarCliente (valorIngresado) {     
         
        $ctrl.Mensaje="";
        $ctrl.boton_submmit=true;

        $ctrl.objDataLlamado.type_accion="buscar_cliente";              
        $ctrl.objDataLlamado.id_provincia=$ctrl.dataprovincia.selectedOption.id;
        $ctrl.objDataLlamado.id_localidad=$ctrl.datalocalidad.selectedOption.id;

        $ctrl.objDataLlamado.criterio=valorIngresado;
          
        clienteFactory.buscarCliente($ctrl.objDataLlamado).then(function(d) {

            $ctrl.tableParams.settings({dataset: d.Respuesta});        

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

        $ctrl.objDataLlamado.fecha_llamado = $filter('date')($ctrl.objDataLlamado.dt1, 'yyyy-MM-dd'); 
        $ctrl.objDataLlamado.fecha_origen_dato = $filter('date')($ctrl.objDataLlamado.dt2, 'yyyy-MM-dd'); 
        $ctrl.objDataLlamado.hora_llamado = $filter('date')($ctrl.objDataLlamado.time, 'HH:mm:ss'); 

        $ctrl.objDataLlamado.id_vendedor=$ctrl.data_vendedor.selectedOption.id;

        $ctrl.objDataLlamado.id_edificio = $ctrl.data_edificio.selectedOption.id_edificio;
        $ctrl.objDataLlamado.id_planta = $ctrl.data_planta.selectedOption.id_planta;
        $ctrl.objDataLlamado.id_dpto = $ctrl.data_dpto.selectedOption.id_dpto;

        $ctrl.objDataLlamado.id_cierre_operacion = $ctrl.cierre_operacion.selectedOption.id_cierre_operacion; 
        $ctrl.objDataLlamado.fecha_cierre_operacion = $filter('date')($ctrl.objDataLlamado.dt3, 'yyyy-MM-dd');

        $ctrl.objDataLlamado.grado_interes=$ctrl.grado_interes.selectedOption.id;
        $ctrl.objDataLlamado.id_origen_dato = $ctrl.data_origen_dato.selectedOption.id_origen_dato; 

        const metodo=$stateParams.type_ingreso.split(".");

        console.log(metodo[1]);
        
        llamadoFactory[metodo[1]]($ctrl.objDataLlamado).then(function(d) {                   
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