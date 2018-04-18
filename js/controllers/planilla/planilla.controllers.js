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
       // $ctrl.NuevaPlanilla=NuevaPlanilla;

        // To configure table   
        //*****************************************************************************//    

        var initialParams = {
          count: 10 // initial page size
        };

        var initialSettings = {
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2
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
                //console.log(d.Planilla);

                 $ctrl.tableParams.settings({dataset: d.Planilla}); 
                            
              }).catch(function (err) {
                  console.log(err);
              });       

        }
/*
        function NuevaPlanilla() {
            
          $ctrl.allow_disable=true;

          $ctrl.objDataPlanilla.type_accion="nueva_planilla";
       
          planillaFactory.nuevaPlanilla($ctrl.objDataPlanilla).then(function(d) {  
                             
                  $ctrl.Mensaje=d.MessageComment;
                  $ctrl.allow_disable=false;
      
           }).catch(function (err) {
                console.log(err);
                $ctrl.allow_disable=false;
           });                    
        };

     */

        Init();

     }// DataSendController

})(window.angular);