(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Vendedor", Vendedor);
  
  Vendedor.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "vendedorFactory"];

    //Controller
    function Vendedor ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, vendedorFactory) {
                                   
          var $ctrl_v = this;

          $ctrl_v.objDataVendedor={};
          $ctrl_v.allow_disable=false;
          $ctrl_v.allow_visible=true;
                     
          // For Modal
          $ctrl_v.itemsModals=[];
          $ctrl_v.itemWarning=[];
          $ctrl_v.animationsEnabled=true;        

          $ctrl_v.Init = Init;
          $ctrl_v.NuevoVendedor=NuevoVendedor;

          function Init () { }

          function NuevoVendedor() {
              
            //$ctrl_v.allow_disable=true;

            $ctrl_v.objDataVendedor.type_accion="nuevo_vendedor";
         
            vendedorFactory.nuevoVendedor($ctrl_v.objDataVendedor).then(function(d) {  
                               
                    $ctrl_v.Mensaje=d.MessageComment;
                    //$ctrl_v.allow_disable=false;
        
             }).catch(function (err) {
                  console.log(err);
                  //$ctrl_v.allow_disable=false;
             });                    
        };

      Init();

     }// DataSendController

})(window.angular);