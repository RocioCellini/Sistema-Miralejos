


//Modificar



(function(_angular) {
  
  var app=_angular.module("myFomrC1");

  app.controller("ListadoIngresos", ListadoIngresos);
  ListadoIngresos.$inject = ["$scope", "$state", "$stateParams",
  "clienteFactory", "NgTableParams","$window", "$filter"];

          //Controller
          function ListadoIngresos($scope, $state,  
            $stateParams , clienteFactory,  
             NgTableParams, $window, $filter) {
                          
                
            // Vars And Functions   
            //****************************************************************************************//
                 var $ctrl_bc=this;


                 $ctrl_bc.objSearch={
                       criterio:""
                 };

                 $ctrl_bc.allow_disable2=true;          

                $ctrl_bc.Init = Init;
                $ctrl_bc.StartSearch = StartSearch;
                $ctrl_bc.GoDataEdit = GoDataEdit;
                $ctrl_bc.DeleteUser = DeleteUser;
                $ctrl_bc.GetExcel = GetExcel;

                $ctrl_bc.Init();

            // To configure table   
            //****************************************************************************************//    
                var initialParams = {
                  count: 10 // initial page size
                };



                var initialSettings = {
                    paginationMaxBlocks: 13,
                    paginationMinBlocks: 2,
                    dataset: $ctrl_bc.objSearch.result
                };

                $ctrl_bc.tableParams = new NgTableParams(initialParams, initialSettings);
            

                $ctrl_bc.objSearch={};



         // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
          function Init () {
            
                  //$ctrl_bc.objSearch.type_accion="search_ingresos";
                  //$ctrl_bc.objSearch.criterio="";
                   $ctrl_bc.objSearch;
                               
                       
                  IngresoDataFactory.buscarIngresos($ctrl_bc.objSearch).then(function(d) {

                      console.log(d);
                 
                      $ctrl_bc.tableParams.settings({dataset: d.Respuesta});

                      console.log($ctrl_bc.tableParams.settings().counts);

                  }).catch(function (err) {
                      console.log(err);
                    });
             
          };

             
         // Searching data        
         //**********************************************************************************************//  
          function StartSearch () {     
                                     
                  
          };

          // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
          function GoDataEdit (objuser) {
              
              IngresoDataFactory.saveDataForm(objuser);
              $state.go('myFomrC1.modificaPaciente');

          };


     


              
      }// DataSendController
})(window.angular);
/**********************************************/
// FOR TABLE