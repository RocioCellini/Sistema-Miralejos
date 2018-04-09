(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarEdificio", BuscarEdificio);
  BuscarEdificio.$inject = ["$scope", "$state", "$stateParams", "edificioFactory", "NgTableParams","$window", "$filter",  "formLoginFactory"];

          //Controller
          function BuscarEdificio($scope, $state, $stateParams , edificioFactory,  
             NgTableParams, $window, $filter, formLoginFactory) {
                          
                var $ctrl_be=this;

                $ctrl_be.objSearch={
                       criterio:""
                };       

                $ctrl_be.objLogin ={};

                Object.defineProperty ( $ctrl_be.objLogin, "type_accion", {
                    value: "checkSession",
                    writable: false,
                    enumerable: true,
                    configurable: false
                }); 


                $ctrl_be.Init = Init;
                $ctrl_be.BuscarEdificio = BuscarEdificio;
                $ctrl_be.GoDataEdit = GoDataEdit;

                $ctrl_be.Init();


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

            $ctrl_be.tableParams = new NgTableParams(initialParams, initialSettings);    

            formLoginFactory.checkSession($ctrl_be.objLogin).then( function(d) {

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

                $ctrl_be.boton_submmit=true;

                $ctrl_be.objSearch.type_accion="buscar_edificio";              

                $ctrl_be.objSearch.criterio=valorIngresado;

               //console.log($ctrl_be.objSearch);
                  
                edificioFactory.buscarEdificio($ctrl_be.objSearch).then(function(d) {

                //console.log('JSON: '+d);
                console.log(d.Respuesta); 
               
                $ctrl_be.tableParams.settings({dataset: d.Respuesta});   

                    // console.log('Datos enviados a tableParams: '+d.Respuesta); 

                $ctrl_be.boton_submmit=false;      
    
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
