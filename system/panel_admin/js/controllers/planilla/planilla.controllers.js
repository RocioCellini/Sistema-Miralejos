(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Planilla", Planilla);
  
  Planilla.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "planillaFactory"];

    //Controller
    function Planilla ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, planillaFactory) {
                                   
          var $ctrl_p = this;

          $ctrl_p.objDataPlanilla={};
      
          $ctrl_p.Init = Init;
          $ctrl_p.NuevaPlanilla=NuevaPlanilla;

          function Init () { }

          function NuevaPlanilla() {
              
            //$ctrl_p.allow_disable=true;

            $ctrl_p.objDataPlanilla.type_accion="nueva_planilla";
         
            planillaFactory.nuevaPlanilla($ctrl_p.objDataPlanilla).then(function(d) {  
                               
                    $ctrl_p.Mensaje=d.MessageComment;
                    //$ctrl_p.allow_disable=false;
        
             }).catch(function (err) {
                  console.log(err);
                  //$ctrl_p.allow_disable=false;
             });                    
        };

      Init();

     }// DataSendController

})(window.angular);