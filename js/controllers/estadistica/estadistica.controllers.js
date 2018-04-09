(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Estadistica", Estadistica);
  
  Estadistica.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "estadisticaFactory", "formLoginFactory"];

    //Controller
    function Estadistica ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, estadisticaFactory, formLoginFactory) {
                                   
          var $ctrl_e = this;

          $ctrl_e.objDataEstagistica={};

          $ctrl_e.objLogin ={};

          Object.defineProperty ( $ctrl_e.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
          }); 
      
          $ctrl_e.Init = Init;
          $ctrl_e.NuevaEstadistica=NuevaEstadistica;

          function Init () {

              formLoginFactory.checkSession($ctrl_e.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                      
              });    

           }

          function NuevaEstadistica() {
              
            //$ctrl_e.allow_disable=true;

            $ctrl_e.objDataEstagistica.type_accion="nueva_estadistica";
         
            estadisticaFactory.nuevaEstadistica($ctrl_e.objDataEstagistica).then(function(d) {  
                               
                    $ctrl_e.Mensaje=d.MessageComment;
                    //$ctrl_e.allow_disable=false;
        
             }).catch(function (err) {
                  console.log(err);
                  //$ctrl_e.allow_disable=false;
             });                    
        };

      Init();

     }// DataSendController

})(window.angular);