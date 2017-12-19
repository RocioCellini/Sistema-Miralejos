(function(_angular) {

  "use strict";

  var app=_angular.module("myFomrC1");

  app.controller("IngresoPaciente", IngresoPaciente);
  
  IngresoPaciente.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
  "defaultdataFactory", "pacientedataFactory"];

          //Controller
          function IngresoPaciente($scope, $sce, $state,  $stateParams,  $window,
           $uibModal, $document, defaultdataFactory, pacientedataFactory) {
                                         
                 var $ctrl_ip=this;
                 
                 $ctrl_ip.objDataPaciente={};
                 $ctrl_ip.allow_disable=false;
                 $ctrl_ip.allow_visible=true;
                             
                 // For Modal
                 $ctrl_ip.itemsModals=[];
                 $ctrl_ip.itemWarning=[];
                 $ctrl_ip.animationsEnabled=true;
              
                 $ctrl_ip.GoUrl = GoUrl;
                 $ctrl_ip.IngresoPacienteC1 = IngresoPacienteC1;
                 $ctrl_ip.Init = Init;
                 $ctrl_ip.upDate = upDate;
                 $ctrl_ip.buscarPaciente=buscarPaciente;
            

    //------------------------------------------------------------------------------------------------// 
    function Init () {

            console.log("Que Chipote ES INIT!!!!");

          // $ctrl_ap.allow_disable=false;                   
          //self.objData=modifydataFactory.dataDefault();   
    };    
    
        

    //-------------------------------------------------------------------------------------------------  
    function upDate () { 


    }


    function buscarPaciente () {
              

              $ctrl_ip.objDataPaciente.type_accion="buscar_paciente";
              
              pacientedataFactory.buscarPaciente($ctrl_ip.objDataPaciente).then(function(d) {                   

                      $ctrl_ip.objDataPaciente.nombre=d.nombre;
                      $ctrl_ip.objDataPaciente.apellido=d.apellido;
                      $ctrl_ip.objDataPaciente.fecha_nacimiento=d.fecha_nacimiento;
                      $ctrl_ip.objDataPaciente.sexo=d.sexo;
                      $ctrl_ip.objDataPaciente.edad=d.edad;
                      $ctrl_ip.objDataPaciente.provincia=d.provincia;
                      $ctrl_ip.objDataPaciente.ciudad=d.localidad;

               }).catch(function (err) {
                    console.log(err);
               });                
              

    };



    
    //***************************************************************************************************//     
      function IngresoPacienteC1() {     

        console.log("Alta Paciente Inserted C1 Muy Chipi");
                         
      
             /*
              $ctrl_ip.objDataPaciente.type_accion="ingresar_paciente";          
              
              defaultdataFactory.pacientedataFactory($ctrl_ip.objDataPaciente).then(function(d) {    
               }).catch(function (err) {
                  console.log(err);
               });*/              
    };

    //---------------------------------------------------------------------------------------------------// 
          function GoUrl () {
                 //$state.go('myAppPanel.main');
                 console.log("Chipotea a una URL NUEVA!");
          };


         Init();
         


     }// DataSendController

})(window.angular);