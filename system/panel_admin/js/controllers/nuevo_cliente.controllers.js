(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevoCliente", NuevoCliente);
  
  NuevoCliente.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "clienteDataFactory"];

          //Controller
          function NuevoCliente ($scope, $sce, $state,  $stateParams,  $window,
           $uibModal, $document, clienteDataFactory) {
                                         
                 var $ctrl_nc = this;
                 
                 $ctrl_nc.objDataCliente={};
                 $ctrl_nc.allow_disable=false;
                 $ctrl_nc.allow_visible=true;
                             
                 // For Modal
                 $ctrl_nc.itemsModals=[];
                 $ctrl_nc.itemWarning=[];
                 $ctrl_nc.animationsEnabled=true;
              
               
                
                 $ctrl_nc.Init = Init;
                 $ctrl_nc.upDate = upDate;
                 $ctrl_nc.NuevoCliente=NuevoCliente;
            

    //------------------------------------------------------------------------------------------------// 

    /*
    $ctrl_nc.Init = Init;
    $ctrl_nc.Init = function  Init () {

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


    function NuevoCliente () {
              
              //$ctrl_nc.allow_disable=true;

              $ctrl_nc.objDataCliente.type_accion="nuevo_cliente";
         
              $ctrl_nc.objDataCliente.id_provincia=1;
              $ctrl_nc.objDataCliente.id_localidad=5;
              $ctrl_nc.objDataCliente.conoce="si";
              
              clienteDataFactory.nuevoCliente($ctrl_nc.objDataCliente).then(function(d) {                   
                      $ctrl_nc.Mensaje=d.Mensaje;
                      //$ctrl_nc.allow_disable=false;
          
               }).catch(function (err) {
                    console.log(err);
                    //$ctrl_nc.allow_disable=false;
               });                
              

    };


         Init();
         


     }// DataSendController

})(window.angular);