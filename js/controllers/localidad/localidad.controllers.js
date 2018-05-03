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

          $ctrl.Init=Init;
          $ctrl.Save=Save;

          function Init () {

              $ctrl.Titulo="Nueva Localidad";
              $ctrl.objDataLocalidad.type_accion="nueva_localidad";

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

                  $ctrl.dataprovincia.availableOptions.unshift({id:-1, name:'Seleccionar'});
                  $ctrl.dataprovincia.selectedOption.id=-1; 

                  if( $stateParams.type_ingreso==="GestionVentas.modificarLocalidad" ) {

                    $ctrl.Titulo="Modificar Localidad";

                    console.log($stateParams.objdata); //bien

                    $ctrl.objDataLocalidad=$stateParams.objdata;
                    $ctrl.dataprovincia.selectedOption.id=$ctrl.objDataLocalidad.id_provincia;
                    $ctrl.objDataLocalidad.type_accion="editar_localidad";

                  }
          
              }).catch(function (err) {
                    console.log(err);
              });                
             
          }; //Fin Init   


          function Save() {
   
              $ctrl.objDataLocalidad.id_provincia=$ctrl.dataprovincia.selectedOption.id;

              //ES6 La variable CONST
              const metodo=$stateParams.type_ingreso.split(".");

              console.log(metodo[1]); // bien
              console.log($ctrl.objDataLocalidad); //bien

              localidadFactory[metodo[1]]( $ctrl.objDataLocalidad ).then(function(d) {   

                $ctrl.Mensaje=d.Mensaje;

              }).catch(function (err) {
                    console.log(err);
              });  

          }; // Fin Save

    Init();

    } //Fin Localidad

})(window.angular);