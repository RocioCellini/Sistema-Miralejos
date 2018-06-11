(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Planilla", Planilla);
  
  Planilla.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "planillaFactory", "NgTableParams", "formLoginFactory"];

    //Controller
    function Planilla ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, planillaFactory, NgTableParams, formLoginFactory) {
                                   
        var $ctrl = this;

        $ctrl.objDataPlanilla={};

        $ctrl.objLogin ={};

        Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                value: "checkSession",
                writable: false,
                enumerable: true,
                configurable: false
        }); 
    
        $ctrl.Init = Init;
        $ctrl.GoDataHistorial=GoDataHistorial;

        // To configure table   
        //*****************************************************************************//    

        var initialParams = {
          count: 10 // initial page size
        };

        var initialSettings = {
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            filterOptions: { filterLayout: "horizontal" }
        };      


        // Functions 
        //*****************************************************************************//    
       
        function Init () { 

          $ctrl.tableParams = new NgTableParams(initialParams, initialSettings);   

           formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
              });       

           $ctrl.objDataPlanilla.type_accion="cargar_planilla"; 

           planillaFactory.cargarPlanilla($ctrl.objDataPlanilla).then( function(d) {

                //console.log(d.Vendedor);
                console.log(d.Planilla);

                 $ctrl.tableParams.settings({dataset: d.Planilla}); 
                            
              }).catch(function (err) {
                  console.log(err);
              });       

        }

        function GoDataHistorial(row, data, index) {

              //console.log(row); es la fila de la planilla en la que hice clic
              //console.log(data); son todas las filas de la planilla, no se para que lo recibe como parametro esta función
              //console.log(index); resultados de los llamados

             $state.go("GestionVentas.verHistorial",{ objdata:row });  
                       
        }


        Init();

     }// DataSendController

})(window.angular);