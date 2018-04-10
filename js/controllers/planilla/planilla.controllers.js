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
        $ctrl.NuevaPlanilla=NuevaPlanilla;

        $ctrl.cancel = cancel;
        $ctrl.del = del;
        $ctrl.save = save;

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

        }

        function NuevaPlanilla() {
            
          //$ctrl.allow_disable=true;

          $ctrl.objDataPlanilla.type_accion="nueva_planilla";
       
          planillaFactory.nuevaPlanilla($ctrl.objDataPlanilla).then(function(d) {  
                             
                  $ctrl.Mensaje=d.MessageComment;
                  //$ctrl.allow_disable=false;
      
           }).catch(function (err) {
                console.log(err);
                //$ctrl.allow_disable=false;
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