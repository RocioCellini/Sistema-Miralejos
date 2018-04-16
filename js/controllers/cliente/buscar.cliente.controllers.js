(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarCliente", BuscarCliente);
  BuscarCliente.$inject = ["$scope", "$state", "$stateParams",
  "clienteFactory", "NgTableParams","$window", "defaultdataFactory", "$filter",  "formLoginFactory"];

          //Controller
          function BuscarCliente($scope, $state, $stateParams , clienteFactory,  
             NgTableParams, $window, defaultdataFactory, $filter, formLoginFactory) {
                          
                var $ctrl=this;

                $ctrl.objSearch={
                       criterio:""
                };

                $ctrl.objDataCliente={};

                $ctrl.objLogin ={};

                Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                    value: "checkSession",
                    writable: false,
                    enumerable: true,
                    configurable: false
                }); 

                $ctrl.datalocalidad2={};
       
                $ctrl.defaultparams={};

                $ctrl.allow_disable=true;

                $ctrl.combo_ciudad=true;
                $ctrl.boton_submmit=false;          

                $ctrl.Init = Init;
                $ctrl.upDate = upDate;
                $ctrl.BuscarCliente = BuscarCliente;

                $ctrl.GoDataEdit=GoDataEdit; 

                $ctrl.Init();


            // To configure table   
            //*****************************************************************************//    

                var initialParams = {
                  count: 10 // initial page size
                };

                var initialSettings = {
                    paginationMaxBlocks: 13,
                    paginationMinBlocks: 2
                };         
               

         // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
          function Init () {

            $ctrl.tableParams = new NgTableParams(initialParams, initialSettings); 

            formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                       angular.isDefined(d.setUrl)?goUrl(d):null;
                                      
                            function goUrl (d) {                                 
                                $state.go( d.setUrl );                               
                            }
              });    

            $ctrl.defaultparams.type_accion="search_data_combos";
            defaultdataFactory.buscar_datos_combos($ctrl.defaultparams).then(function(d) {    


    
            //console.log(d);

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
                

           }).catch(function (err) {
                console.log(err);
           });               
      
          };

          //-------------------------------------------------------------------------------------------------  

          function upDate (objprov) { 

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

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarCliente (valorIngresado) {     
              
              //console.log(valorIngresado);   

              $ctrl.boton_submmit=true;

              $ctrl.objSearch.type_accion="buscar_cliente";              
              $ctrl.objSearch.id_provincia=$ctrl.dataprovincia.selectedOption.id;
              $ctrl.objSearch.id_localidad=$ctrl.datalocalidad.selectedOption.id;

              $ctrl.objSearch.criterio=valorIngresado;

              console.log($ctrl.objSearch);
                
              clienteFactory.buscarCliente($ctrl.objSearch).then(function(d) {

              //console.log('JSON: '+d);
              console.log(d.Respuesta);
             
              $ctrl.tableParams.settings({dataset: d.Respuesta});  //dataset es cada row  que encuentra 

                  // console.log('Datos enviados a tableParams: '+d.Respuesta); 

              $ctrl.boton_submmit=false;      

              }).catch(function (err) {
                  console.log(err);
              });
                         
          };

        function GoDataEdit(row){

          $ctrl.objDataCliente.type_accion="editar_cliente";

          $state.go("GestionVentas.nuevoCliente",params ); 

          $ctrl.objDataCliente.id_cliente= row.id_cliente;
          $ctrl.objDataCliente.nombre= row.nombre;
          $ctrl.objDataCliente.apellido= row.apellido;
          $ctrl.objDataCliente.dni= row.dni;
          $ctrl.objDataCliente.telefono1= row.telefono1;
          $ctrl.objDataCliente.telefono2= row.telefono2;
          $ctrl.objDataCliente.email= row.email;
          $ctrl.objDataCliente.id_provincia= row.provincia;
          $ctrl.objDataCliente.id_localidad= row.localidad;
          $ctrl.objDataCliente.id_actividad= row.actividad;
          $ctrl.objDataCliente.conoce= row.conoce;

          console.log($ctrl.objDataCliente); //aquí se usa objSearch, pero el template usa objDataCliente
          console.log(row); //lo muestra bien


          clienteFactory.editarCliente($ctrl.objDataCliente).then(function(d) {  

                  $ctrl.Mensaje=d.Mensaje;

                  console.log('JSON: '+d);

                  // $state.go(d.setUrl);     

                 /* angular.isDefined(d.setUrl)?goUrl(d):null;                       

                      function goUrl (d) {                                
                          $state.go(d.setUrl);                               
                      }*/
      
           }).catch(function (err) {
                console.log(err);
           });   

      }//Fin GoDataEdit

    
      }// DataSendController

})(window.angular);
