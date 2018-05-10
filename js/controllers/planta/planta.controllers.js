(function(_angular) {

    "use strict";

    var app=_angular.module("GestionVentas");

    app.controller("Planta", Planta);
    
    Planta.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
     "plantaFactory", "formLoginFactory"];

    //Controller
    function Planta ($scope, $sce, $state,  $stateParams,  $window,
        $uibModal, $document, plantaFactory, formLoginFactory) {
                                 
        var $ctrl = this;

        $ctrl.objDataPlanta={};

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

            $ctrl.Titulo="Nueva Planta";
            $ctrl.Boton="Guardar";
            $ctrl.objDataPlanta.type_accion="nueva_planta";

            formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                            
            });     

            if( $stateParams.type_ingreso==="GestionVentas.modificarPlanta" ) {

                $ctrl.Titulo="Modificar Planta";    
                $ctrl.Boton="Guardar";            
                $ctrl.objDataPlanta=$stateParams.objdata;
                $ctrl.objDataPlanta.type_accion="editar_planta";

            }   

            if( $stateParams.type_ingreso==="GestionVentas.eliminarPlanta" ) {                       

                $ctrl.Titulo="Eliminar Planta";
                $ctrl.Boton="Eliminar";
                $ctrl.objDataPlanta=$stateParams.objdata;
                $ctrl.objDataPlanta.type_accion="eliminar_planta";

              }             
          
        };    


        function Save() {
                  
            const metodo=$stateParams.type_ingreso.split(".");  //ES6 La variable CONST
                    
            plantaFactory[metodo[1]]($ctrl.objDataPlanta).then(function(d) {   

              $ctrl.Mensaje=d.Mensaje;
        
            }).catch(function (err) {
                  console.log(err);
            });            

        };
        
       Init();

  }// DataSendController

})(window.angular);