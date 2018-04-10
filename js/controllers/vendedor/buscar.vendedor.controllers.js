
(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarVendedor", BuscarVendedor);
  BuscarVendedor.$inject = ["$scope", "$state", "$stateParams", "vendedorFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

  //Controller
  function BuscarVendedor($scope, $state,$stateParams , vendedorFactory,  
       NgTableParams, $window, $filter, formLoginFactory) {
                    
        var $ctrl=this;

        $ctrl.objSearch={
             criterio:""
        };      

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

          };

             
         // Searching data        
         //**********************************************************************************************//  
        function BuscarVendedor (valorIngresado) {     
              
              //console.log(valorIngresado);   da bien

              $ctrl.boton_submmit=true;

              $ctrl.objSearch.type_accion="buscar_vendedor";              

              $ctrl.objSearch.criterio=valorIngresado;

             //console.log($ctrl.objSearch); da bien
                
              vendedorFactory.buscarVendedor($ctrl.objSearch).then(function(d) {

              console.log('JSON: '+d);
              //console.log(d.Respuesta); da undefined
             
              $ctrl.tableParams.settings({dataset: d.Respuesta});   

                  // console.log('Datos enviados a tableParams: '+d.Respuesta); 

              $ctrl.boton_submmit=false;      

              }).catch(function (err) {
                  console.log(err);
              });
            
          };
          

          // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
        function GoDataEdit (objuser) {

              //$state.go('GestionVentas.modificarVendedor');

          };
              
      }// DataSendController

})(window.angular);
