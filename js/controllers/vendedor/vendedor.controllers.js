(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Vendedor", Vendedor);
  
  Vendedor.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "vendedorFactory", "formLoginFactory"];

    //Controller
    function Vendedor ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, vendedorFactory, formLoginFactory) {
                                   
          var $ctrl = this;

          $ctrl.objDataVendedor={};

          $ctrl.objLogin ={};

          Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                  value: "checkSession",
                  writable: false,
                  enumerable: true,
                  configurable: false
          }); 

          $ctrl.allow_disable=false;
          $ctrl.allow_visible=true;
                     
          // For Modal
          $ctrl.itemsModals=[];
          $ctrl.itemWarning=[];
          $ctrl.animationsEnabled=true;        

          $ctrl.Init = Init;
          $ctrl.NuevoVendedor=NuevoVendedor;

          function Init () {

             formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
            });  
               
          }

          function NuevoVendedor() {
              
            //$ctrl.allow_disable=true;

            $ctrl.objDataVendedor.type_accion="nuevo_vendedor";
         
            vendedorFactory.nuevoVendedor($ctrl.objDataVendedor).then(function(d) {  
                               
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