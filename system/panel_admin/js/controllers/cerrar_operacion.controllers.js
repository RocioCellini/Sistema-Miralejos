(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("CerrarOperacion", CerrarOperacion);

  CerrarOperacion.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "CerrarOperacionFactory", "defaultdataFactory", "$filter"];

          //Controller
          function CerrarOperacion ($scope, $sce, $state,  $stateParams,  $window,
           $uibModal, $document, CerrarOperacionFactory, defaultdataFactory, $filter) {
                                         
                 var $ctrl_co = this;
                 
                 $ctrl_co.data={};
                
                 $ctrl_co.objDataCerrarOperacion={};
                 $ctrl_co.defaultparams={};
                 $ctrl_co.allow_disable=false;
                 $ctrl_co.allow_visible=true;                                     
                
                 $ctrl_co.Init = Init;
                 $ctrl_co.upDateEdificio = upDateEdificio;
                 $ctrl_co.upDatePlanta = upDatePlanta;
                 $ctrl_co.CerrarOperacion=CerrarOperacion;
                

          function Init () {
                      
              $ctrl_co.defaultparams.type_accion="buscar_edificio_planta_dpto";

              defaultdataFactory.buscar_edificio_planta_dpto($ctrl_co.defaultparams).then(function(d) {                            
                        
              console.log(d);

              $ctrl_co.data_edificio = {
                availableOptions: d.edificio,
                selectedOption: {id_edificio: '1'} //This sets the default value of the select in the ui
              };
        
            }).catch(function (err) {
                  console.log(err);
              });         

          };    

    //-------------------------------------------------------------------------------------------------  


    function upDateEdificio(obj_edificio) { 

          console.log(obj_edificio);

          $ctrl_co.defaultparams.type_accion="relacion_edificio_planta_dpto";

         // Objecto edificio contiene la propiedad ID seleccionada en ese momento por el usuario.
          $ctrl_co.defaultparams.id_edificio=obj_edificio.id_edificio;

          defaultdataFactory.relacion_edificio_planta_dpto($ctrl_co.defaultparams).then(function(d) {                            
                    

          $ctrl_co.data_planta = {
              availableOptions: d.plantas,
              selectedOption: {id_planta: d.plantas[0].id_planta} 
          };

          $ctrl_co.data_dpto = {
              availableOptions: d.plantas[0].dptos, 
              selectedOption: {id_dpto: d.plantas[0].dptos[0].id_dpto}
          };        

        }).catch(function (err) {
              console.log(err);
          });         
      }

    function upDatePlanta (objplanta) {

        $ctrl_co.data_dpto = {
              availableOptions: objplanta.dptos, 
              selectedOption: {id_dpto: objplanta.dptos[0].id_dpto}
          };                                                                     
      }

    function CerrarOperacion () {              
        //$ctrl_co.allow_disable=true;

        $ctrl_co.objDataCerrarOperacion.type_accion="cerrar_operacion";
   
        $ctrl_co.objDataCerrarOperacion.id_edificio=$ctrl_co.data_edificio.selectedOption.id;
        $ctrl_co.objDataCerrarOperacion.id_planta=$ctrl_co.data_planta.selectedOption.id;
        $ctrl_co.objDataCerrarOperacion.id_dpto=$ctrl_co.data_dpto.selectedOption.id;

        CerrarOperacionFactory.cerrarOperacion($ctrl_co.objDataCerrarOperacion).then(function(d) {                   
                $ctrl_co.Mensaje=d.Mensaje;
                //$ctrl_co.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_co.allow_disable=false;
         });                
    };

    Init();

    }// DataSendController

})(window.angular);