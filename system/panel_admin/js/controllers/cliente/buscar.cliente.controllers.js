(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarCliente", BuscarCliente);
  BuscarCliente.$inject = ["$scope", "$state", "$stateParams",
  "clienteFactory", "NgTableParams","$window", "defaultdataFactory", "$filter"];

          //Controller
          function BuscarCliente($scope, $state, $stateParams , clienteFactory,  
             NgTableParams, $window, defaultdataFactory, $filter) {
                          
                var $ctrl_bc=this;

                $ctrl_bc.objSearch={
                       criterio:""
                };

                $ctrl_bc.datalocalidad2={};
       
                $ctrl_bc.defaultparams={};

                $ctrl_bc.allow_disable=true;

                $ctrl_bc.combo_ciudad=true;
                $ctrl_bc.boton_submmit=false;          

                $ctrl_bc.Init = Init;
                $ctrl_bc.upDate = upDate;
                $ctrl_bc.BuscarCliente = BuscarCliente;

                $ctrl_bc.GoDataEdit = GoDataEdit;

                $ctrl_bc.Init();


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

            $ctrl_bc.tableParams = new NgTableParams(initialParams, initialSettings); 

            $ctrl_bc.defaultparams.type_accion="search_data_combos";
            defaultdataFactory.buscar_datos_combos($ctrl_bc.defaultparams).then(function(d) {    
    
            //console.log(d);

            $ctrl_bc.datalocalidad2=d.localidad;
            
            $ctrl_bc.dataprovincia = {
                availableOptions: d.provincia,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui

            };
           
            $ctrl_bc.dataprovincia.availableOptions.unshift({id:-1, name:'Seleccionar'});
            $ctrl_bc.dataprovincia.selectedOption.id=-1; 

            $ctrl_bc.datalocalidad = {
                availableOptions: d.localidad,
                selectedOption: {id: '1'} 
            };     

            $ctrl_bc.datalocalidad.availableOptions.unshift({id:-1, name:'Seleccionar'});
            $ctrl_bc.datalocalidad.selectedOption.id=-1; 
                

           }).catch(function (err) {
                console.log(err);
           });               
      
          };

          //-------------------------------------------------------------------------------------------------  

          function upDate (objprov) { 

            if(objprov.id!==-1) {

                $ctrl_bc.combo_ciudad=false;

                $ctrl_bc.datalocalidad.availableOptions = $filter('filter')($ctrl_bc.datalocalidad2 ,{id_provincia:objprov.id});
                $ctrl_bc.datalocalidad.selectedOption={id: $ctrl_bc.datalocalidad.availableOptions[0].id}; 

                $ctrl_bc.datalocalidad.availableOptions.unshift({id:-1, name:'Seleccionar'});
                $ctrl_bc.datalocalidad.selectedOption.id=-1;

                } else {

                    $ctrl_bc.combo_ciudad=true;
              }                                                                         
          }

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarCliente (valorIngresado) {     
              
              //console.log(valorIngresado);   

              $ctrl_bc.boton_submmit=true;

              $ctrl_bc.objSearch.type_accion="buscar_cliente";              
              $ctrl_bc.objSearch.id_provincia=$ctrl_bc.dataprovincia.selectedOption.id;
              $ctrl_bc.objSearch.id_localidad=$ctrl_bc.datalocalidad.selectedOption.id;

              $ctrl_bc.objSearch.criterio=valorIngresado;

              console.log($ctrl_bc.objSearch);
                
              clienteFactory.buscarCliente($ctrl_bc.objSearch).then(function(d) {

              //console.log('JSON: '+d);
              console.log(d.Respuesta);
             
              $ctrl_bc.tableParams.settings({dataset: d.Respuesta});  //dataset es cada row  que encuentra 

                  // console.log('Datos enviados a tableParams: '+d.Respuesta); 

              $ctrl_bc.boton_submmit=false;      

              }).catch(function (err) {
                  console.log(err);
              });
                         
          };


          // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
          function TraerCliente(row) {             
            
             $ctrl_ll.objDataLlamado.id_cliente=row.id_cliente;
             $ctrl_ll.objDataLlamado.contato= row.nombre +" ,"+ row.apellido;

          };
    
      }// DataSendController

})(window.angular);
