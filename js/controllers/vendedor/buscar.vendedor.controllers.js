
(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarVendedor", BuscarVendedor);
  BuscarVendedor.$inject = ["$scope", "$state", "$stateParams", "vendedorFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

  //Controller
  function BuscarVendedor($scope, $state,$stateParams , vendedorFactory,  
       NgTableParams, $window, $filter, formLoginFactory) {
                    
        var $ctrl_bv=this;

        $ctrl_bv.objSearch={
             criterio:""
        };      

        $ctrl_bv.objLogin ={};

         Object.defineProperty ( $ctrl_bv.objLogin, "type_accion", {
                  value: "checkSession",
                  writable: false,
                  enumerable: true,
                  configurable: false
         }); 

        $ctrl_bv.Init = Init;
        $ctrl_bv.BuscarVendedor = BuscarVendedor;
        $ctrl_bv.GoDataEdit = GoDataEdit;

        $ctrl_bv.boton_submmit=false;          

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

       

        // To go to modify form for pacient suscribers      
        //**********************************************************************************************// 

        function Init () {

            $ctrl_bv.tableParams = new NgTableParams(initialParams, initialSettings);    

            formLoginFactory.checkSession($ctrl_bv.objLogin).then( function(d) {

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

              $ctrl_bv.boton_submmit=true;

              $ctrl_bv.objSearch.type_accion="buscar_vendedor";              

              $ctrl_bv.objSearch.criterio=valorIngresado;

             //console.log($ctrl_bv.objSearch); da bien
                
              vendedorFactory.buscarVendedor($ctrl_bv.objSearch).then(function(d) {

              console.log('JSON: '+d);
              //console.log(d.Respuesta); da undefined
             
              $ctrl_bv.tableParams.settings({dataset: d.Respuesta});   

                  // console.log('Datos enviados a tableParams: '+d.Respuesta); 

              $ctrl_bv.boton_submmit=false;      

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
