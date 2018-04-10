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

                $ctrl.objLogin ={};

                Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                    value: "checkSession",
                    writable: false,
                    enumerable: true,
                    configurable: false
                }); 


                $ctrl.Init = Init;
                $ctrl.BuscarEdificio = BuscarEdificio;
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
          function BuscarEdificio (valorIngresado) {     

                //console.log(valorIngresado);   

                $ctrl.boton_submmit=true;

                $ctrl.objSearch.type_accion="buscar_edificio";              

                $ctrl.objSearch.criterio=valorIngresado;

               //console.log($ctrl.objSearch);
                  
                edificioFactory.buscarEdificio($ctrl.objSearch).then(function(d) {

                //console.log('JSON: '+d);
                console.log(d.Respuesta); 
               
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
            
             // $state.go('GestionVentas.modificarCliente');

          };
    
      }// DataSendController

})(window.angular);
