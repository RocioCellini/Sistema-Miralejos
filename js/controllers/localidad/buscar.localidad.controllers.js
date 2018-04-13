(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarLocalidad", BuscarLocalidad);
  BuscarLocalidad.$inject = ["$scope", "$state", "$stateParams", "localidadFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

          //Controller
          function BuscarLocalidad($scope, $state, $stateParams , localidadFactory,  
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
                $ctrl.BuscarLocalidad = BuscarLocalidad;
                $ctrl.GoDataEdit = GoDataEdit;

                $ctrl.Init();


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
          function BuscarLocalidad (valorIngresado) {     

                //console.log(valorIngresado);   
                $ctrl.Mensaje="";
                
                $ctrl.boton_submmit=true;

                $ctrl.objSearch.type_accion="buscar_localidad";              

                $ctrl.objSearch.criterio=valorIngresado;

                console.log($ctrl.objSearch);
                  
                localidadFactory.buscarLocalidad($ctrl.objSearch).then(function(d) {

                  $ctrl.tableParams.settings({dataset: d.Respuesta});   

                  $ctrl.boton_submmit=false;      

                /*Se llama ternaria y reemplaza al if
                angular.isDefined(d.Respuesta[0].Mensaje)?ShowMessage(d):LoadTable(d);
              
                function LoadTable (d) {
                   $ctrl.tableParams.settings({dataset: d.Respuesta})
                }

                function ShowMessage (d) { 
                    $ctrl.Mensaje=d.Respuesta[0].Mensaje;
                }      */
 
    
              }).catch(function (err) {

                 /* $ctrl.boton_submmit=false;
                  $ctrl.Mensaje="Intente más tarde";  */
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
