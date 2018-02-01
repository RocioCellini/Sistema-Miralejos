(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarDpto", BuscarDpto);
  BuscarDpto.$inject = ["$scope", "$state", "$stateParams",
  "dptoFactory", "NgTableParams","$window", "$filter"];

          //Controller
          function BuscarDpto($scope, $state, $stateParams , dptoFactory,  
             NgTableParams, $window, $filter) {
                          
                var $ctrl_bd=this;

                $ctrl_bd.objSearch={
                       criterio:""
                };

                $ctrl_bd.allow_disable=true;          

                $ctrl_bd.Init = Init;
                $ctrl_bd.BuscarDpto = BuscarDpto;
                $ctrl_bd.GoDataEdit = GoDataEdit;

                $ctrl_bd.Init();


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

             $ctrl_bd.tableParams = new NgTableParams(initialParams, initialSettings);            
      
          };

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarDpto () {     
              
              //console.log(valorIngresado);   

              $ctrl_bd.objSearch.type_accion="buscar_dpto";
              $ctrl_bd.objSearch.criterio="A";
                
              dptoFactory.buscarDpto($ctrl_bd.objSearch).then(function(d) {

                 //console.log('JSON: '+d);
                 console.log($ctrl_bd.objSearch);
             
                  $ctrl_bd.tableParams.settings({dataset: d.Respuesta});   

                  console.log('Datos enviados a tableParams: '+d.Respuesta);       

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
