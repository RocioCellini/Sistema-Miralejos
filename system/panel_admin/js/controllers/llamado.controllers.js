(function(_angular) {

  "use strict";

  var app = _angular.module("GestionVentas");

  app.controller("Llamado", Llamado);
  
  Llamado.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "llamadoFactory", "defaultdataFactory"];

  //Controller
  function Llamado ($scope, $sce, $state,  $stateParams,  $window,
   $uibModal, $document, llamadoFactory, defaultdataFactory) {
                                 
     var $ctrl_ll = this;
     
     $ctrl_ll.defaultparams = {};
     $ctrl_ll.objDataLlamado = {};
     $ctrl_ll.allow_disable = false;
     $ctrl_ll.allow_visible = true;

     $ctrl_ll.Init = Init;
     $ctrl_ll.upDateEdificio = upDateEdificio;
     $ctrl_ll.upDatePlanta = upDatePlanta;
     $ctrl_ll.NuevoLlamado = NuevoLlamado;
        

     function Init () {

      $ctrl_ll.defaultparams.type_accion = "buscar_edificio_planta_dpto";
      defaultdataFactory.buscar_edificio_planta_dpto($ctrl_ll.defaultparams).then(function(d) {                            
        
      console.log(d);

      $ctrl_ll.data_edificio = {
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

          $ctrl_ll.defaultparams.type_accion = "relacion_edificio_planta_dpto";

         // Objecto edificio contiene la propiedad ID seleccionada en ese momento por el usuario.
          $ctrl_ll.defaultparams.id_edificio = obj_edificio.id_edificio;

          defaultdataFactory.relacion_edificio_planta_dpto($ctrl_ll.defaultparams).then(function(d) {                            
                    

          $ctrl_ll.data_planta = {
              availableOptions: d.plantas,
              selectedOption: {id_planta: d.plantas[0].id_planta} 
          };

          $ctrl_ll.data_dpto = {
              availableOptions: d.plantas[0].dptos, 
              selectedOption: {id_dpto: d.plantas[0].dptos[0].id_dpto}
          };        

        }).catch(function (err) {
              console.log(err);
          });         
      }

    function upDatePlanta (obj_planta) {

        $ctrl_ll.data_dpto = {
              availableOptions: obj_planta.dptos, 
              selectedOption: {id_dpto: obj_planta.dptos[0].id_dpto}
          };                                                                     
      }


    function NuevoLlamado () {
                
        //$ctrl_ll.allow_disable=true;

        $ctrl_ll.objDataLlamado.type_accion = "nuevo_llamado";

        $ctrl_ll.objDataLlamado.id_edificio = $ctrl_ll.data_edificio.selectedOption.id;
        $ctrl_ll.objDataLlamado.id_planta = $ctrl_ll.data_planta.selectedOption.id;
        $ctrl_ll.objDataLlamado.id_dpto = $ctrl_ll.data_dpto.selectedOption.id;
        
    
        llamadoFactory.nuevoLlamado($ctrl_ll.objDataLlamado).then(function(d) {                   
                $ctrl_ll.Mensaje = d.Mensaje;
                //$ctrl_ll.allow_disable=false;
    
         }).catch(function (err) {
              console.log(err);
              //$ctrl_ll.allow_disable=false;
         });                 
    };
      
     Init();

  }// DataSendController

})(window.angular);