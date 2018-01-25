(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoVendedor", NuevoVendedor);
  
  NuevoVendedor.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "vendedorFactory"];

    //Controller
    function NuevoVendedor ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, vendedorFactory) {
                                   
          var $ctrl_nv = this;

          $ctrl_nv.objDataVendedor={};
          $ctrl_nv.allow_disable=false;
          $ctrl_nv.allow_visible=true;
                     
          // For Modal
          $ctrl_nv.itemsModals=[];
          $ctrl_nv.itemWarning=[];
          $ctrl_nv.animationsEnabled=true;        

          $ctrl_nv.Init = Init;
          $ctrl_nv.NuevoVendedor=NuevoVendedor;

          function Init () { }

          function NuevoVendedor() {
              
            //$ctrl_nv.allow_disable=true;

            $ctrl_nv.objDataVendedor.type_accion="nuevo_vendedor";
         
            vendedorFactory.nuevoVendedor($ctrl_nv.objDataVendedor).then(function(d) {  
                               
                    $ctrl_nv.Mensaje=d.MessageComment;
                    //$ctrl_nv.allow_disable=false;
        
             }).catch(function (err) {
                  console.log(err);
                  //$ctrl_nv.allow_disable=false;
             });                    
        };

      Init();

     }// DataSendController

    function BuscarVendedor ($scope, $sce, $state,  $stateParams, $window,
     $uibModal, $document, vendedorFactory, $filter) {

        $ctrl_bv=this;
        $ctrl_bv.objDataVendedor={};        
        $ctrl_bv.Buscar=Buscar;

        function Buscar() {

          $ctrl_bv.objDataVendedor.type_accion="buscar_vendedor";

          vendedorFactory.buscarVendedor($ctrl_bv.objDataVendedor).then(function(d) {                   
                  $ctrl_bv.Mensaje=d.Mensaje;     
      
           }).catch(function (err) {
                console.log(err);          
           });                
      };
    }

})(window.angular);