(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarDpto", BuscarDpto);
  BuscarDpto.$inject = ["$scope", "$state", "$stateParams", "dptoFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

    //Controller
    function BuscarDpto($scope, $state, $stateParams , dptoFactory,  
        NgTableParams, $window, $filter, formLoginFactory) {
                          
        var $ctrl=this;

        $ctrl.objSearch={
               criterio:""
        };       

        $ctrl.objDataDpto={};

        $ctrl.objLogin={};

        Object.defineProperty ( $ctrl.objLogin, "type_accion", {
            value: "checkSession",
            writable: false,
            enumerable: true,
            configurable: false
        }); 

        $ctrl.Init = Init;
        $ctrl.BuscarDpto = BuscarDpto;
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
        //*************************************************************************************// 

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
        //*********************************************************************************//  

        function BuscarDpto (valorIngresado) {    

            $ctrl.boton_submmit=true;

            $ctrl.objSearch.type_accion="buscar_dpto";              

            $ctrl.objSearch.criterio=valorIngresado;
              
            dptoFactory.buscarDpto($ctrl.objSearch).then(function(d) {

              $ctrl.tableParams.settings({dataset: d.Respuesta}); 
              $ctrl.boton_submmit=false;      

            }).catch(function (err) {
              console.log(err);
            });
                         
        };


        // Bottom Edit      
        //********************************************************************************// 

        function GoDataEdit (row) {             
            
          $ctrl.objDataDpto.type_accion="editar_dpto";
          $state.go("GestionVentas.modificarDpto",{ objdata:row }); 

        };
    
      }// DataSendController

})(window.angular);
