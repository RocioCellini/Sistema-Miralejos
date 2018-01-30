(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarCliente", BuscarCliente);
  BuscarCliente.$inject = ["$scope", "$state", "$stateParams",
  "clienteFactory", "NgTableParams","$window", "$filter"];

          //Controller
          function BuscarCliente($scope, $state, $stateParams , clienteFactory,  
             NgTableParams, $window, $filter) {
                          
                var $ctrl_bc=this;

                $ctrl_bc.objSearch={
                       criterio:""
                };

                $ctrl_bc.allow_disable=true;          

                $ctrl_bc.Init = Init;
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
      
          };

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarCliente (valorIngresado) {     
              
              //console.log(valorIngresado);   

              $ctrl_bc.objSearch.type_accion="buscar_cliente";
              
              //$ctrl_bc.objSearch.email="maria@miralejos.net";
                
              clienteFactory.buscarCliente($ctrl_bc.objSearch).then(function(d) {

              // console.log('JSON: '+d);
              console.log($ctrl_bc.objSearch);
             
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
