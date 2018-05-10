(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarEdificio", BuscarEdificio);
  BuscarEdificio.$inject = ["$scope", "$state", "$stateParams", "edificioFactory", "NgTableParams","$window", "$filter",  "formLoginFactory"];

      //Controller
      function BuscarEdificio($scope, $state, $stateParams , edificioFactory,  
           NgTableParams, $window, $filter, formLoginFactory) {
                          
            var $ctrl=this;

            $ctrl.objSearch={
                   criterio:""
            };       

            $ctrl.objDataEdificio={};

            $ctrl.objLogin={};

            Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                value: "checkSession",
                writable: false,
                enumerable: true,
                configurable: false
            }); 


            $ctrl.Init = Init;
            $ctrl.BuscarEdificio = BuscarEdificio;
            $ctrl.GoDataEdit = GoDataEdit;
            $ctrl.GoDataDelete = GoDataDelete;            

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
            //*******************************************************************************// 

            function Init () {

              $ctrl.tableParams = new NgTableParams(initialParams, initialSettings);    

              formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                   angular.isDefined(d.setUrl)?goUrl(d):null;
                                  
                        function goUrl (d) {                                 
                            $state.go(d.setUrl);                               
                        }                        
              });                       
            };

             
            // Searching data        
            //**********************************************************************************************//  
            function BuscarEdificio (valorIngresado) {      

                $ctrl.boton_submmit=true;

                $ctrl.objSearch.type_accion="buscar_edificio";              

                $ctrl.objSearch.criterio=valorIngresado;
                  
                edificioFactory.buscarEdificio($ctrl.objSearch).then(function(d) {
               
                  $ctrl.tableParams.settings({dataset: d.Respuesta});
                  $ctrl.boton_submmit=false;      
    
                }).catch(function (err) {
                    console.log(err);
                });                         
            };


            // Bottom Edit      
            //*******************************************************************************// 

            function GoDataEdit (row) {             
              
               $ctrl.objDataEdificio.type_accion="editar_edificio";
               $state.go("GestionVentas.modificarEdificio",{ objdata:row }); 

            };

            // Bottom Delete 
            //**********************************************************************************************// 

            function GoDataDelete( row ){

              console.log(row);

              $ctrl.objDataEdificio.type_accion="eliminar_edificio";
              $state.go("GestionVentas.eliminarEdificio",{ objdata:row }); 

            }
    
      }// DataSendController

})(window.angular);
