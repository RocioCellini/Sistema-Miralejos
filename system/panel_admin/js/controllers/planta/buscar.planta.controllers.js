(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarPlanta", BuscarPlanta);
  BuscarPlanta.$inject = ["$scope", "$state", "$stateParams", "plantaFactory", "NgTableParams","$window", "$filter"];

          //Controller
          function BuscarPlanta($scope, $state, $stateParams , plantaFactory,  
             NgTableParams, $window, $filter) {
                          
                var $ctrl_bp=this;

                $ctrl_bp.objSearch={
                       criterio:""
                };       

                $ctrl_bp.Init = Init;
                $ctrl_bp.BuscarPlanta = BuscarPlanta;
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
          function BuscarPlanta (valorIngresado) {     

                //console.log(valorIngresado);   

                $ctrl_bp.boton_submmit=true;

                $ctrl_bp.objSearch.type_accion="buscar_planta";              

                $ctrl_bp.objSearch.criterio=valorIngresado;

               //console.log($ctrl_bp.objSearch);
                  
                plantaFactory.buscarPlanta($ctrl_bp.objSearch).then(function(d) {

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
