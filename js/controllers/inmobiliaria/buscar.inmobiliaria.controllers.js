(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarInmobiliaria", BuscarInmobiliaria);
  BuscarInmobiliaria.$inject = ["$scope", "$state", "$stateParams", "inmobiliariaFactory", "NgTableParams","$window", "$filter",  "formLoginFactory"];

          //Controller
          function BuscarInmobiliaria($scope, $state, $stateParams , inmobiliariaFactory,  
             NgTableParams, $window, $filter, formLoginFactory) {
                          
                var $ctrl=this;

                $ctrl.objSearch={
                       criterio:""
                };       

                $ctrl.objDataInmob={};

                $ctrl.objLogin={};

                Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                    value: "checkSession",
                    writable: false,
                    enumerable: true,
                    configurable: false
                }); 


                $ctrl.Init = Init;
                $ctrl.BuscarInmobiliaria = BuscarInmobiliaria;
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
               

              // Initializing       
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

              function BuscarInmobiliaria (valorIngresado) {     

                $ctrl.boton_submmit=true;

                $ctrl.objSearch.type_accion="buscar_inmob";              

                $ctrl.objSearch.criterio=valorIngresado;
                  
                inmobiliariaFactory.buscarInmob($ctrl.objSearch).then(function(d) {
               
                $ctrl.tableParams.settings({dataset: d.Respuesta});   

                $ctrl.boton_submmit=false;      
    
                }).catch(function (err) {
                    console.log(err);
                });
                         
              };


              // Bottom Edit  
              //**********************************************************************************************// 

              function GoDataEdit (row) {

                  $ctrl.objDataInmob.type_accion="editar_inmob";
                  $state.go("GestionVentas.modificarInmob",{ objdata:row }); 

              };
          
      }// DataSendController

})(window.angular);
