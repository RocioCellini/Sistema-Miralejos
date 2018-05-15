(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("HistorialLlamado", HistorialLlamado);
  
  HistorialLlamado.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "planillaFactory", "NgTableParams", "formLoginFactory"];

    //Controller
    function HistorialLlamado ($scope, $sce, $state,  $stateParams,  $window,
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

                 angular.isDefined(d.setUrl)?goUrl(d):LoadTable();
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
           });       

           
           function LoadTable () {

              $ctrl.objDataPlanilla.type_accion="ver_historial"; 
              $ctrl.objDataPlanilla.id_cliente=$stateParams.objdata.id_cliente;

              planillaFactory.verHistorial($ctrl.objDataPlanilla).then( function(d) {

                    console.log(d);

                   $ctrl.tableParams.settings({dataset: d.Respuesta}); 
                              
                }).catch(function (err) {
                    console.log(err);
                }); 


           }

              

        }


        Init();

     }// DataSendController

})(window.angular);