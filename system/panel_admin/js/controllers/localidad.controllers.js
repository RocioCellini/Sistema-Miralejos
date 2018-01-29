(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Localidad", Localidad);
  
  Localidad.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "localidadFactory", "defaultdataFactory"];

          //Controller
          function Localidad ($scope, $sce, $state,  $stateParams,  $window,
           $uibModal, $document, localidadFactory, defaultdataFactory) {
                                         
            var $ctrl_loc = this;

            $ctrl_loc.objDataLocalidad={};
            $ctrl_loc.defaultparams={};
            $ctrl_loc.allow_disable=false;
            $ctrl_loc.allow_visible=true;
                       
            // For Modal
            $ctrl_loc.itemsModals=[];
            $ctrl_loc.itemWarning=[];
            $ctrl_loc.animationsEnabled=true;

            $ctrl_loc.Init = Init;
            $ctrl_loc.upDate = upDate;
            $ctrl_loc.NuevaLocalidad=NuevaLocalidad;

          function Init () {
                      
                $ctrl_loc.defaultparams.type_accion="search_provincialocalidad";
                defaultdataFactory.buscarProvinciaLocalidad($ctrl_loc.defaultparams).then(function(d) {        

                $ctrl_loc.dataprovincia = {
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
              
        //$ctrl_loc.allow_disable=true;

        $ctrl_loc.objDataLocalidad.type_accion="nueva_localidad";
   
        $ctrl_loc.objDataLocalidad.id_provincia=$ctrl_loc.dataprovincia.selectedOption.id;
        
        localidadFactory.nuevaLocalidad($ctrl_loc.objDataLocalidad).then(function(d) {                   
                $ctrl_loc.Mensaje=d.Mensaje;
                //$ctrl_loc.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_loc.allow_disable=false;
         });                             
    };

    Init();

    }// NuevaLocalidad

})(window.angular);