(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("NuevaLocalidad", NuevaLocalidad);
  
  NuevaLocalidad.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "localidadFactory", "defaultdataFactory"];

          //Controller
          function NuevaLocalidad ($scope, $sce, $state,  $stateParams,  $window,
           $uibModal, $document, localidadFactory, defaultdataFactory) {
                                         
            var $ctrl_nloc = this;

            $ctrl_nloc.objDataLocalidad={};
            $ctrl_nloc.defaultparams={};
            $ctrl_nloc.allow_disable=false;
            $ctrl_nloc.allow_visible=true;
                       
            // For Modal
            $ctrl_nloc.itemsModals=[];
            $ctrl_nloc.itemWarning=[];
            $ctrl_nloc.animationsEnabled=true;

            $ctrl_nloc.Init = Init;
            $ctrl_nloc.upDate = upDate;
            $ctrl_nloc.NuevaLocalidad=NuevaLocalidad;

          function Init () {
                      
                $ctrl_nloc.defaultparams.type_accion="search_provincialocalidad";
                defaultdataFactory.buscarProvinciaLocalidad($ctrl_nloc.defaultparams).then(function(d) {        

                $ctrl_nloc.dataprovincia = {
                    availableOptions: d.provincia,
                    selectedOption: {id: '1'} //This sets the default value of the select in the ui
               };
          
               }).catch(function (err) {
                    console.log(err);
               });                
             
          };    

    //-------------------------------------------------------------------------------------------------  
    function upDate () { 

    }


    function NuevaLocalidad () {
              
        //$ctrl_nloc.allow_disable=true;

        $ctrl_nloc.objDataLocalidad.type_accion="nueva_localidad";
   
        $ctrl_nloc.objDataLocalidad.id_provincia=$ctrl_nloc.dataprovincia.selectedOption.id;
        
        localidadFactory.nuevaLocalidad($ctrl_nloc.objDataLocalidad).then(function(d) {                   
                $ctrl_nloc.Mensaje=d.Mensaje;
                //$ctrl_nloc.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_nloc.allow_disable=false;
         });                             
    };

    Init();

    }// NuevaLocalidad

})(window.angular);