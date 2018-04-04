(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Planilla", Planilla);
  
  Planilla.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "planillaFactory", "NgTableParams"];

    //Controller
    function Planilla ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, planillaFactory, NgTableParams) {
                                   
        var $ctrl_p = this;

        $ctrl_p.objDataPlanilla={};
    
        $ctrl_p.Init = Init;
        $ctrl_p.NuevaPlanilla=NuevaPlanilla;

        $ctrl_p.cancel = cancel;
        $ctrl_p.del = del;
        $ctrl_p.save = save;

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

          $ctrl_p.tableParams = new NgTableParams(initialParams, initialSettings);   

        }

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

        function cancel(row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(row, originalRow);
        }

        function del(row) {
            _.remove(self.tableParams.settings().dataset, function(item) {
              return row === item;
            });
            self.tableParams.reload().then(function(data) {
              if (data.length === 0 && self.tableParams.total() > 0) {
                self.tableParams.page(self.tableParams.page() - 1);
                self.tableParams.reload();
              }
            });
        }
          
        function resetRow(row, rowForm){
            row.isEditing = false;
            rowForm.$setPristine();
            self.tableTracker.untrack(row);
            return _.findWhere(originalData, function(r){
              return r.id === row.id;
            });
        }

        function save(row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(originalRow, row);
        }
        

        Init();

     }// DataSendController

})(window.angular);