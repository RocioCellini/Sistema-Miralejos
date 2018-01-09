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
           $ctrl_nv.upDate = upDate;
           $ctrl_nv.NuevoVendedor=NuevoVendedor;
      

    //------------------------------------------------------------------------------------------------// 

    /*
    $ctrl_nv.Init = Init;
    $ctrl_nv.Init = function  Init () {

    }
    */


    function Init () {

           console.log("Aqui Deben Llamarse los Combos");

          // $ctrl_ap.allow_disable=false;                   
          //self.objData=modifydataFactory.dataDefault();   
    };    
    
        

    //-------------------------------------------------------------------------------------------------  
    function upDate () { 


    }


    function NuevoVendedor () {
              
              //$ctrl_nv.allow_disable=true;

              $ctrl_nv.objDataVendedor.type_accion="nuevo_vendedor";
         
              $ctrl_nv.objDataVendedor.nombre="roxana";
              $ctrl_nv.objDataVendedor.email="vende@hotmail.com";
              
              vendedorFactory.nuevoVendedor($ctrl_nv.objDataVendedor).then(function(d) {                   
                      $ctrl_nv.Mensaje=d.Mensaje;
                      //$ctrl_nv.allow_disable=false;
          
               }).catch(function (err) {
                    console.log(err);
                    //$ctrl_nv.allow_disable=false;
               });                      

    };

      Init();

     }// DataSendController

})(window.angular);