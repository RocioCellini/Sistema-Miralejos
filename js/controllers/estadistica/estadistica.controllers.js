(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Estadistica", Estadistica);
  
  Estadistica.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "estadisticaFactory", "formLoginFactory"];

    //Controller
    function Estadistica ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, estadisticaFactory, formLoginFactory) {
                                   
          var $ctrl = this;

          $ctrl.objDataEstagistica={};

          $ctrl.objLogin ={};

          Object.defineProperty ( $ctrl.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
          }); 
      
          $ctrl.Init = Init;
          $ctrl.NuevaEstadistica=NuevaEstadistica;

          function Init () {

              formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                      
              });    

           }

          function NuevaEstadistica() {
              
            //$ctrl.allow_disable=true;

            $ctrl.objDataEstagistica.type_accion="nueva_estadistica";
         
            estadisticaFactory.nuevaEstadistica($ctrl.objDataEstagistica).then(function(d) {  
                               
                    $ctrl.Mensaje=d.MessageComment;
                    //$ctrl.allow_disable=false;
        
             }).catch(function (err) {
                  console.log(err);
                  //$ctrl.allow_disable=false;
             });                    
        };

      Init();

     }// DataSendController

})(window.angular);