(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarCliente", BuscarCliente);
  BuscarCliente.$inject = ["$scope", "$state", "$stateParams",
  "clienteFactory", "NgTableParams","$window", "$filter"];

          //Controller
          function BuscarCliente($scope, $state,  
            $stateParams , clienteFactory,  
             NgTableParams, $window, $filter) {
                          
                
            // Vars And Functions   
            //****************************************************************************************//
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
            //****************************************************************************************//    
                var initialParams = {
                  count: 10 // initial page size
                };



                var initialSettings = {
                    paginationMaxBlocks: 13,
                    paginationMinBlocks: 2
                };


                //http://ng-table.com/#/
                $ctrl_bc.tableParams = new NgTableParams(initialParams, initialSettings);
            

                $ctrl_bc.objSearch={};



         // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
          function Init () {
            
                  //$ctrl_bc.objSearch.type_accion="search_ingresos";
                  //$ctrl_bc.objSearch.criterio="";
                   $ctrl_bc.objSearch;
                               
                       
                  clienteFactory.buscarCliente($ctrl_bc.objSearch).then(function(d) {

                      console.log(d);
                 
                      $ctrl_bc.tableParams.settings({dataset: d.Respuesta});

              

                  }).catch(function (err) {
                      console.log(err);
                    });
             
          };

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarCliente (valorIngresado) {     
                console.log(valorIngresado);               
          };

          // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
          function GoDataEdit (objuser) {
              
            
             // $state.go('myFomrC1.modificaPaciente');

          };


     


              
      }// DataSendController
})(window.angular);
/**********************************************/
// FOR TABLE