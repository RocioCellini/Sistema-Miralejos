(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarLocalidad", BuscarLocalidad);
  BuscarLocalidad.$inject = ["$scope", "$state", "$stateParams", "localidadFactory", "NgTableParams","$window", "$filter"];

          //Controller
          function BuscarLocalidad($scope, $state, $stateParams , localidadFactory,  
             NgTableParams, $window, $filter) {
                          
                var $ctrl_bloc=this;

                $ctrl_bloc.objSearch={
                       criterio:""
                };       

                $ctrl_bloc.Init = Init;
                $ctrl_bloc.BuscarLocalidad = BuscarLocalidad;
                $ctrl_bloc.GoDataEdit = GoDataEdit;

                $ctrl_bloc.Init();


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

             $ctrl_bloc.tableParams = new NgTableParams(initialParams, initialSettings);            
      
          };

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarLocalidad (valorIngresado) {     

                //console.log(valorIngresado);   
                $ctrl_bloc.Mensaje="";
                
                $ctrl_bloc.boton_submmit=true;

                $ctrl_bloc.objSearch.type_accion="buscar_localidad";              

                $ctrl_bloc.objSearch.criterio=valorIngresado;

                //console.log($ctrl_bloc.objSearch);
                  
                localidadFactory.buscarLocalidad($ctrl_bloc.objSearch).then(function(d) {

                // Se llama ternaria y reemplaza al if
                angular.isDefined(d.Respuesta[0].Mensaje)?ShowMessage(d):LoadTable(d);
              
                function LoadTable (d) {
                   $ctrl_bloc.tableParams.settings({dataset: d.Respuesta})
                }

                function ShowMessage (d) { 
                    $ctrl_bloc.Mensaje=d.Respuesta[0].Mensaje;
                }      

                $ctrl_bloc.boton_submmit=false;      
    
              }).catch(function (err) {

                  $ctrl.boton_submmit=false;
                  $ctrl.Mensaje="Intente más tarde";  
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
