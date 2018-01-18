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
                 $ctrl_co.data_planta2={};
                 $ctrl_co.data_dpto2={};
                 $ctrl_co.objDataCerrarOperacion={};
                 $ctrl_co.defaultparams={};
                 $ctrl_co.allow_disable=false;
                 $ctrl_co.allow_visible=true;                                     
                
                 $ctrl_co.Init = Init;
                 $ctrl_co.upDatePlanta = upDatePlanta;
                 $ctrl_co.upDateDpto = upDateDpto;
                 $ctrl_co.CerrarOperacion=CerrarOperacion;
                

          function Init () {
                      
            $ctrl_co.defaultparams.type_accion="search_edificio_planta_dpto";
            defaultdataFactory.buscar_edificio_planta_dpto($ctrl_co.defaultparams).then(function(d) {                            
              
              $ctrl_co.data_planta2=d.data_planta;
              $ctrl_co.data_dpto2=d.data_departamento;

              
              console.log(d);


              $ctrl_co.data_edificio = {
                availableOptions: d.edificio,
                selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

              $ctrl_co.data_planta = {
                  availableOptions: d.planta,
                  selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };

              $ctrl_co.data_dpto = {
                  availableOptions: d.dpto,
                  selectedOption: {id: '1'} //This sets the default value of the select in the ui
              };
        
            }).catch(function (err) {
                  console.log(err);
              });         
          };    

    //-------------------------------------------------------------------------------------------------  



    function upDatePlanta (obj_edificio) { 

           $ctrl_co.data_planta.availableOptions = $filter('filter')($ctrl_co.data_planta2 ,{id_edificio:obj_edificio.id});
           $ctrl_co.data_planta.selectedOption={id: $ctrl_co.data_planta.availableOptions[0].id};                                                                         
      }

    function upDateDpto (obj_planta) { 

           $ctrl_co.data_dpto.availableOptions = $filter('filter')($ctrl_co.data_dpto2 ,{id_planta:obj_planta.id});
           $ctrl_co.data_dpto.selectedOption={id: $ctrl_co.data_dpto.availableOptions[0].id};                                                                         
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