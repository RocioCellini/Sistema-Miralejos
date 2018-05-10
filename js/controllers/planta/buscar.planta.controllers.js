(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarPlanta", BuscarPlanta);
  BuscarPlanta.$inject = ["$scope", "$state", "$stateParams", "plantaFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

      //Controller
      function BuscarPlanta($scope, $state, $stateParams , plantaFactory,  
          NgTableParams, $window, $filter, formLoginFactory) {
                          
          var $ctrl=this;

          $ctrl.objSearch={
                 criterio:""
          };       

          $ctrl.objDataPlanta={};

          $ctrl.objLogin={};

          Object.defineProperty($ctrl.objLogin, "type_accion", {
                  value: "checkSession",
                  writable: false,
                  enumerable: true,
                  configurable: false
          }); 

          $ctrl.Init = Init;
          $ctrl.BuscarPlanta = BuscarPlanta;
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
          //***********************************************************************************// 

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
          //**************************************************************************************//  

          function BuscarPlanta (valorIngresado) {     

              $ctrl.boton_submmit=true;

              $ctrl.objSearch.type_accion="buscar_planta";              

              $ctrl.objSearch.criterio=valorIngresado;
                
              plantaFactory.buscarPlanta($ctrl.objSearch).then(function(d) {
             
                $ctrl.tableParams.settings({dataset: d.Respuesta});
                $ctrl.boton_submmit=false;      
    
              }).catch(function (err) {
                  console.log(err);
                });
                         
          };


          // Bottom Edit     
          //*****************************************************************************// 

          function GoDataEdit (row) {             
            
            $ctrl.objDataPlanta.type_accion="editar_planta";
            $state.go("GestionVentas.modificarPlanta",{ objdata:row }); 

          };

          // Bottom Delete 
          //**********************************************************************************************// 

          function GoDataDelete( row ){

            console.log(row);

            $ctrl.objDataPlanta.type_accion="eliminar_planta";
            $state.go("GestionVentas.eliminarPlanta",{ objdata:row }); 

          }
    
      }// DataSendController

})(window.angular);
