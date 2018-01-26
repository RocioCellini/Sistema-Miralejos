
(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarVendedor", BuscarVendedor);
  BuscarVendedor.$inject = ["$scope", "$state", "$stateParams",
  "vendedorFactory", "NgTableParams","$window", "$filter"];

  //Controller
  function BuscarVendedor($scope, $state,$stateParams , vendedorFactory,  
       NgTableParams, $window, $filter) {
                    
        var $ctrl_bv=this;

        $ctrl_bv.objSearch={
             criterio:""
        };

        $ctrl_bv.allow_disable2=true;          

        $ctrl_bv.Init = Init;
        $ctrl_bv.BuscarVendedor = BuscarVendedor;
        $ctrl_bv.GoDataEdit = GoDataEdit;

        $ctrl_bv.Init();


      // To configure table   
      //****************************************************************************************//    

        var initialParams = {
          count: 10 // initial page size
        };

        var initialSettings = {
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2
        };

        $ctrl_bv.tableParams = new NgTableParams(initialParams, initialSettings);

        $ctrl_bv.objSearch={};


        // To go to modify form for pacient suscribers      
        //**********************************************************************************************// 

        function Init () {
            
              //$ctrl_bv.objSearch.type_accion="search_ingresos";
              //$ctrl_bv.objSearch.criterio="";
              $ctrl_bv.objSearch;                           
                   
              vendedorFactory.buscarVendedor($ctrl_bv.objSearch).then(function(d) {

                  console.log(d);
             
                  $ctrl_bv.tableParams.settings({dataset: d.Respuesta});

            }).catch(function (err) {
                console.log(err);
              });    

          };

             
         // Searching data        
         //**********************************************************************************************//  
           function BuscarVendedor (valorIngresado) {     
                console.log(valorIngresado);               
          };
          

          // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
          function GoDataEdit (objuser) {

              //$state.go('GestionVentas.modificarVendedor');

          };
              
      }// DataSendController

})(window.angular);
