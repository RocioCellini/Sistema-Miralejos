(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Estadistica", Estadistica);
  
  Estadistica.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "estadisticaFactory", "formLoginFactory"];

    //Controller
    function Estadistica ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, estadisticaFactory, formLoginFactory) {
                                   
          var $ctrl_est = this;

          $ctrl_est.objDataEstagistica={};

          $ctrl_est.objLogin ={};

          Object.defineProperty ( $ctrl_est.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
          }); 
      
          $ctrl_est.Init = Init;
          $ctrl_est.NuevaEstadistica=NuevaEstadistica;

          function Init () {

              formLoginFactory.checkSession($ctrl_est.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                      
              });    

           }

          function NuevaEstadistica() {
              
            //$ctrl_est.allow_disable=true;

            $ctrl_est.objDataEstagistica.type_accion="nueva_estadistica";
         
            estadisticaFactory.nuevaEstadistica($ctrl_est.objDataEstagistica).then(function(d) {  
                               
                    $ctrl_est.Mensaje=d.MessageComment;
                    //$ctrl_est.allow_disable=false;
        
             }).catch(function (err) {
                  console.log(err);
                  //$ctrl_est.allow_disable=false;
             });                    
        };

      Init();

     }// DataSendController

})(window.angular);