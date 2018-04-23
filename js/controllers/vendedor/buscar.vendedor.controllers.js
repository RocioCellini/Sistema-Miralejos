
(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarVendedor", BuscarVendedor);
  BuscarVendedor.$inject = ["$scope", "$state", "$stateParams", "vendedorFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

    function BuscarVendedor($scope, $state,$stateParams , vendedorFactory,  
        NgTableParams, $window, $filter, formLoginFactory) {
                    
        var $ctrl=this;

        $ctrl.objSearch={
             criterio:""
        };      

        $ctrl.objDataVendedor={};

        $ctrl.objLogin ={};

         Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                  value: "checkSession",
                  writable: false,
                  enumerable: true,
                  configurable: false
         }); 

        $ctrl.Init = Init;
        $ctrl.BuscarVendedor = BuscarVendedor;
        $ctrl.GoDataEdit = GoDataEdit;

        $ctrl.boton_submmit=false;          

        $ctrl.Init();


        // To configure table   
        //****************************************************************************************//    

        var initialParams = {
          count: 10 // initial page size
        };

        var initialSettings = {
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2
        };

       

        //Initializing      
        //**********************************************************************************************// 

        function Init () {

            $ctrl.tableParams = new NgTableParams(initialParams, initialSettings);    

            formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
            });               

          };

             
        // Searching data        
        //**********************************************************************************************//  

        function BuscarVendedor (valorIngresado) {     

            $ctrl.boton_submmit=true;

            $ctrl.objSearch.type_accion="buscar_vendedor";              

            $ctrl.objSearch.criterio=valorIngresado;
              
            vendedorFactory.buscarVendedor($ctrl.objSearch).then(function(d) {
           
            $ctrl.tableParams.settings({dataset: d.Respuesta});   

            $ctrl.boton_submmit=false;      

            }).catch(function (err) {
                console.log(err);
            });
            
          };
          

        // Bottom Edit  
        //**********************************************************************************************// 

        function GoDataEdit (row) {

            $ctrl.objDataVendedor.type_accion="editar_vendedor";
            $state.go("GestionVentas.modificarVendedor",{ objdata:row }); 

          };
              
      }// DataSendController

})(window.angular);
