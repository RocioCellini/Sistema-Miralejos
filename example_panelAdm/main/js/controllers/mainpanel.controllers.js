(function(_angular) {
  
  var app=_angular.module("myAppPanel");

  app.controller("BuscarPagos", BuscarPagos);
  BuscarPagos.$inject = ["$scope", "$state", "$stateParams",
  "buscardataFactory", "modifydataFactory", "NgTableParams","$window"];

          //Controller
          function BuscarPagos($scope, $state,  $stateParams , buscardataFactory,  modifydataFactory,
            NgTableParams, $window) {
                          
                

                 var self=this;
                 self.objSearch={
                       typecredit:null,
                       criterio:null
                 };

                 self.allow_disable2=true;          

                // Functions
                self.StartSearch = StartSearch;
                self.GoDataEdit = GoDataEdit;
                self.DeleteUser = DeleteUser;
                self.upDate = upDate;
                self.GoMenu = GoMenu;
                self.GetExcel = GetExcel;

                var initialParams = {
                  count: 25 // initial page size
                };


                var initialSettings = {
                    paginationMaxBlocks: 13,
                    paginationMinBlocks: 2,
                    dataset: self.objSearch.result
                };

                self.tableParams = new NgTableParams(initialParams, initialSettings);
               

          self.dataCombos = {
                 
                  availableOptions0: [
                                      {Id_Pago: '1', Tipo_Pago: 'Todos'},
                                      {Id_Pago: '2', Tipo_Pago: 'Acreditado'},
                                      {Id_Pago: '3', Tipo_Pago: 'No Acreditado'}
                                      ],
                  selectedOption0: {Id_Pago: '1', Tipo_Pago: 'Todos'},
                
            };

             self.objSearch={
                       typecredit:self.dataCombos.selectedOption0.Id_Pago,
                       criterio:""
            };

         //------------------------------------------------------------------------   
                function upDate (objuser) {                              
                        self.objSearch.typecredit=objuser.Id_Pago;                                         
                };


             
          //---------------------------------------------------------------------// 
          function StartSearch () {     
                     
                     self.objSearch.type_accion="search_fac";
                     self.objSearch.criterio=self.binscripto;
                                       
                     
            buscardataFactory.buscarPagosInscriptos(self.objSearch).then(function() {
                                   
                 self.objSearch.result=buscardataFactory.SaveData();
                 self.objSearch.result[0].Dni_Inscripto==="Sin Resultados"?self.allow_disable2=true:self.allow_disable2=false;
                  
                  
                  self.tableParams.settings({dataset: self.objSearch.result});
                  
             });



          };

          //---------------------------------------------------------------------------------------- 
            function GoDataEdit (objuser) {
                modifydataFactory.saveDataEdit(objuser);
             
                $state.go('myAppPanel.editpago');               
            };


           //----------------------------------------------------------------------------------------
            function DeleteUser (objuser) {
                /*
                buscardataFactory.deleteUser(self.objSearch).then(function() {
                }
                */ 
                           
            }; 


          //-------------------------------------------------------------------------------------------
            function GoMenu (objuser) {
                 $state.go('myApp.turnomedico', { 
                });
            };


          function GetExcel () {    
                 
            if(self.objSearch.criterio===undefined){
                self.objSearch.criterio="";
             }

             self.urlExcel= {
               base:'php/phpexcel/gexcel2.php?type_accion=setexcel_fac&typecredit=',
             }          
             
             $window.open(self.urlExcel.base+self.objSearch.typecredit+'&criterio='+self.objSearch.criterio);                             
            
            };

              
          }// DataSendController
})(window.angular);
/**********************************************/
// FOR TABLE