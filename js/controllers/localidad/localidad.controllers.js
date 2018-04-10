(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Localidad", Localidad);
  
  Localidad.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "localidadFactory", "defaultdataFactory", "formLoginFactory"];

          //Controller
          function Localidad ($scope, $sce, $state,  $stateParams,  $window,
           $uibModal, $document, localidadFactory, defaultdataFactory, formLoginFactory) {
                                         
            var $ctrl = this;

            $ctrl.objDataLocalidad={};

            $ctrl.objLogin ={};

            Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                  value: "checkSession",
                  writable: false,
                  enumerable: true,
                  configurable: false
            }); 

            $ctrl.defaultparams={};
            $ctrl.allow_disable=false;
            $ctrl.allow_visible=true;
                       
            // For Modal
            $ctrl.itemsModals=[];
            $ctrl.itemWarning=[];
            $ctrl.animationsEnabled=true;

            $ctrl.Init = Init;
            $ctrl.upDate = upDate;
            $ctrl.NuevaLocalidad=NuevaLocalidad;

          function Init () {

              formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                   angular.isDefined(d.setUrl)?goUrl(d):null;
                                  
                        function goUrl (d) {                                 
                            $state.go( d.setUrl );                               
                        }
                        
              });       
                      
              $ctrl.defaultparams.type_accion="search_data_combos";
              defaultdataFactory.buscar_datos_combos($ctrl.defaultparams).then(function(d) {        

                  $ctrl.dataprovincia = {
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
              
        //$ctrl.allow_disable=true;

        $ctrl.objDataLocalidad.type_accion="nueva_localidad";
   
        $ctrl.objDataLocalidad.id_provincia=$ctrl.dataprovincia.selectedOption.id;

        console.log("el id de la provincia es: "+$ctrl.dataprovincia.selectedOption.id);

        console.log("params enviados: "+$ctrl.objDataLocalidad);

        console.log("nombre de la localidad enviada: "+$ctrl.objDataLocalidad.nombre);
        
        localidadFactory.nuevaLocalidad($ctrl.objDataLocalidad).then(function(d) {                   
                $ctrl.Mensaje=d.Mensaje;
                //$ctrl.allow_disable=false;
                console.log("respuesta: "+d);
                console.log("localidad: "+$ctrl.objDataLocalidad.nombre);
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl.allow_disable=false;
         });                             
    };

    Init();

    }// NuevaLocalidad

})(window.angular);