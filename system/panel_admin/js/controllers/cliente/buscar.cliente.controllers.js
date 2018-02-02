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

            $ctrl_bc.defaultparams.type_accion="search_provincialocalidad";
            defaultdataFactory.buscarProvinciaLocalidad($ctrl_bc.defaultparams).then(function(d) {    
    
            console.log(d);

            $ctrl_bc.datalocalidad2=d.localidad;

            $ctrl_bc.dataprovincia = {
                availableOptions: d.provincia,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

            $ctrl_bc.datalocalidad = {
                availableOptions: d.localidad,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

           }).catch(function (err) {
                console.log(err);
           });               
      
          };

          //-------------------------------------------------------------------------------------------------  

          function upDate (objprov) { 
           $ctrl_bc.datalocalidad.availableOptions = $filter('filter')($ctrl_bc.datalocalidad2 ,{id_provincia:objprov.id});
           $ctrl_bc.datalocalidad.selectedOption={id: $ctrl_bc.datalocalidad.availableOptions[0].id};                                                                         
          }

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarCliente (valorIngresado) {     
              
              //console.log(valorIngresado);   

              $ctrl_bc.objSearch.type_accion="buscar_cliente";              
              $ctrl_bc.objSearch.id_provincia=$ctrl_bc.dataprovincia.selectedOption.id;
              $ctrl_bc.objSearch.id_localidad=$ctrl_bc.datalocalidad.selectedOption.id;
              //$ctrl_bc.objSearch.email="maria@miralejos.net";

              console.log('id de prov seleccionada: '+$ctrl_bc.objSearch.id_provincia);
              console.log('id de loc seleccionada: '+$ctrl_bc.objSearch.id_localidad);


              $ctrl_bc.objSearch.criterio=valorIngresado;
                
              clienteFactory.buscarCliente($ctrl_bc.objSearch).then(function(d) {

              //console.log('JSON: '+d);
              //console.log($ctrl_bc.objSearch);
             
              $ctrl_bc.tableParams.settings({dataset: d.Respuesta});   

                  // console.log('Datos enviados a tableParams: '+d.Respuesta);       

              }).catch(function (err) {
                  console.log(err);
              });
                         
          };


          // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
          function GoDataEdit (objuser) {             
            
             // $state.go('GestionVentas.modificarCliente');

          };
    
      }// DataSendController

})(window.angular);
