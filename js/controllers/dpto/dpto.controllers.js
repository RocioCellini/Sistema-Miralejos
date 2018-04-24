(function(_angular) {

  "use strict";

  var app=_angular.module("GestionVentas");

  app.controller("Dpto", Dpto);
  
  Dpto.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
   "dptoFactory", "formLoginFactory"];

    //Controller
    function Dpto ($scope, $sce, $state,  $stateParams,  $window,
      $uibModal, $document, dptoFactory, formLoginFactory) {
                                 
        var $ctrl = this;

        $ctrl.objDataDpto={};

        $ctrl.objLogin ={};

        Object.defineProperty ( $ctrl.objLogin, "type_accion", {
            value: "checkSession",
            writable: false,
            enumerable: true,
            configurable: false
        }); 
        
        $ctrl.allow_disable=false;
        $ctrl.allow_visible=true;

        $ctrl.Init = Init;
        $ctrl.Save=Save;
        

        function Init () {

            $ctrl.Titulo="Nuevo Dpto";
            $ctrl.objDataDpto.type_accion="nuevo_dpto";

            formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                    function goUrl (d) {                                 
                        $state.go( d.setUrl );                               
                    }
                      
            }); 

            if( $stateParams.type_ingreso==="GestionVentas.modificarDpto" ) {

                $ctrl.Titulo="Modificar Departamento";                
                $ctrl.objDataDpto=$stateParams.objdata;
                $ctrl.objDataDpto.type_accion="editar_dpto";

            } 
          
        };    


        function Save() {
                  
            const metodo=$stateParams.type_ingreso.split(".");  //ES6 La variable CONST
                        
            dptoFactory[metodo[1]]($ctrl.objDataDpto).then(function(d) {   

              $ctrl.Mensaje=d.Mensaje;
        
            }).catch(function (err) {
                  console.log(err);
            });    

        };
      
        Init();

  }// DataSendController

})(window.angular);