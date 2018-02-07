(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarEdificio", BuscarEdificio);
  BuscarEdificio.$inject = ["$scope", "$state", "$stateParams", "edificioFactory", "NgTableParams","$window", "$filter"];

          //Controller
          function BuscarEdificio($scope, $state, $stateParams , edificioFactory,  
             NgTableParams, $window, $filter) {
                          
                var $ctrl_bp=this;

                $ctrl_bp.objSearch={
                       criterio:""
                };       

                $ctrl_bp.Init = Init;
                $ctrl_bp.BuscarEdificio = BuscarEdificio;
                $ctrl_bp.GoDataEdit = GoDataEdit;

                $ctrl_bp.Init();


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

             $ctrl_bp.tableParams = new NgTableParams(initialParams, initialSettings);            
      
          };

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarEdificio (valorIngresado) {     

                //console.log(valorIngresado);   

                $ctrl_bp.boton_submmit=true;

                $ctrl_bp.objSearch.type_accion="buscar_edificio";              

                $ctrl_bp.objSearch.criterio=valorIngresado;

               //console.log($ctrl_bp.objSearch);
                  
                edificioFactory.buscarEdificio($ctrl_bp.objSearch).then(function(d) {

                //console.log('JSON: '+d);
                console.log(d.Respuesta); 
               
                $ctrl_bp.tableParams.settings({dataset: d.Respuesta});   

                    // console.log('Datos enviados a tableParams: '+d.Respuesta); 

                $ctrl_bp.boton_submmit=false;      
    
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
