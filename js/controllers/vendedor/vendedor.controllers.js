(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Vendedor", Vendedor);
  
  Vendedor.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "vendedorFactory", "formLoginFactory"];

    //Controller
    function Vendedor ($scope, $sce, $state,  $stateParams,  $window,
     $uibModal, $document, vendedorFactory, formLoginFactory) {
                                   
          var $ctrl = this;

          $ctrl.objDataVendedor={};

          $ctrl.objLogin ={};

          Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                  value: "checkSession",
                  writable: false,
                  enumerable: true,
                  configurable: false
          }); 

          $ctrl.allow_disable=false;
          $ctrl.allow_visible=true;
                     
          // For Modal
          $ctrl.itemsModals=[];
          $ctrl.itemWarning=[];
          $ctrl.animationsEnabled=true;        

          $ctrl.Init = Init;
          $ctrl.Save=Save;

          function Init () {

            $ctrl.Titulo="Nuevo Vendedor";
            $ctrl.Boton="Guardar";
            $ctrl.objDataVendedor.type_accion="nuevo_vendedor";

            formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
            });  
             
            if( $stateParams.type_ingreso==="GestionVentas.modificarVendedor" ) {

                $ctrl.Titulo="Modificar Vendedor"; 
                $ctrl.Boton="Guardar";               
                $ctrl.objDataVendedor=$stateParams.objdata;
                $ctrl.objDataVendedor.type_accion="editar_vendedor";

            }


            if( $stateParams.type_ingreso==="GestionVentas.eliminarVendedor" ) {                       

                  $ctrl.Titulo="Eliminar Vendedor";
                  $ctrl.Boton="Eliminar";
                  $ctrl.objDataVendedor=$stateParams.objdata;
                  $ctrl.objDataVendedor.type_accion="eliminar_vendedor";
  
              }
               
          }

          function Save() {
                
            const metodo=$stateParams.type_ingreso.split(".");  
                    
            vendedorFactory[metodo[1]]( $ctrl.objDataVendedor ).then(function(d) {   

              $ctrl.Mensaje=d.Mensaje;
        
            }).catch(function (err) {
                  console.log(err);
            });   
        };

      Init();

     }// DataSendController

})(window.angular);