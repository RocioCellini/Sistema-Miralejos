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
            $ctrl.objDataVendedor.type_accion="nuevo_vendedor";

            formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
            });  

             console.log($stateParams.type_ingreso);
             
            if( $stateParams.type_ingreso==="GestionVentas.modificarVendedor" ) {

                $ctrl.Titulo="Modificar Vendedor";

                console.log($stateParams.objdata);
                $ctrl.objDataVendedor=$stateParams.objdata;

                $ctrl.objDataVendedor.type_accion="editar_vendedor";

            }
               
          }

          function Save() {
              
            //ES6 La variable CONST
            const metodo=$stateParams.type_ingreso.split(".");
           
            /*clienteFactory[modificarCliente] Es para acceder a la propiedad de un Object mediante variable, 
            de forma implícita, sin aclarar cuál es el nombre de dicha propiedad*/
                    
            vendedorFactory[metodo[1]]( $ctrl.objDataVendedor ).then(function(d) {   

            $ctrl.Mensaje=d.Mensaje;
        
             }).catch(function (err) {
                  console.log(err);
             });   
        };

      Init();

     }// DataSendController

})(window.angular);