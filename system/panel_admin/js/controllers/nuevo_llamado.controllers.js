(function(_angular) {

  "use strict";

  var app = _angular.module("GestionVentas");

  app.controller("NuevoLlamado", NuevoLlamado);
  
  NuevoLlamado.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "llamadoFactory", "defaultdataFactory"];

  //Controller
  function NuevoLlamado ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, llamadoFactory, defaultdataFactory) {
                                 
     var $ctrl_nl = this;
     
     $ctrl_nl.defaultparams = {};
     $ctrl_nl.objDataLlamado = {};
     $ctrl_nl.allow_disable = false;
     $ctrl_nl.allow_visible = true;

    
     $ctrl_nl.Init = Init;
     $ctrl_nl.upDateEdificio = upDateEdificio;
     $ctrl_nl.upDatePlanta = upDatePlanta;
     $ctrl_nl.NuevoLlamado = NuevoLlamado;
        

     function Init () {

        $ctrl_nl.defaultparams.type_accion = "buscar_edificio_planta_dpto";
        defaultdataFactory.buscar_edificio_planta_dpto($ctrl_nl.defaultparams).then(function(d) {                            
          
        console.log(d);

        $ctrl_nl.data_edificio = {
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

          $ctrl_nl.defaultparams.type_accion = "relacion_edificio_planta_dpto";

         // Objecto edificio contiene la propiedad ID seleccionada en ese momento por el usuario.
          $ctrl_nl.defaultparams.id_edificio = obj_edificio.id_edificio;

          defaultdataFactory.relacion_edificio_planta_dpto($ctrl_nl.defaultparams).then(function(d) {                            
                    

          $ctrl_nl.data_planta = {
              availableOptions: d.plantas,
              selectedOption: {id_planta: d.plantas[0].id_planta} 
          };

          $ctrl_nl.data_dpto = {
              availableOptions: d.plantas[0].dptos, 
              selectedOption: {id_dpto: d.plantas[0].dptos[0].id_dpto}
          };        

        }).catch(function (err) {
              console.log(err);
          });         
      }

    function upDatePlanta (obj_planta) {

        $ctrl_nl.data_dpto = {
              availableOptions: obj_planta.dptos, 
              selectedOption: {id_dpto: obj_planta.dptos[0].id_dpto}
          };                                                                     
      }


    function NuevoLlamado () {
                
        //$ctrl_nl.allow_disable=true;

        $ctrl_nl.objDataLlamado.type_accion = "nuevo_llamado";

        $ctrl_nl.objDataLlamado.id_edificio = $ctrl_nl.data_edificio.selectedOption.id;
        $ctrl_nl.objDataLlamado.id_planta = $ctrl_nl.data_planta.selectedOption.id;
        $ctrl_nl.objDataLlamado.id_dpto = $ctrl_nl.data_dpto.selectedOption.id;
        
    
        llamadoFactory.nuevoLlamado($ctrl_nl.objDataLlamado).then(function(d) {                   
                $ctrl_nl.Mensaje = d.Mensaje;
                //$ctrl_nl.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_nl.allow_disable=false;
         });                 
    };
      
     Init();

  }// DataSendController

})(window.angular);