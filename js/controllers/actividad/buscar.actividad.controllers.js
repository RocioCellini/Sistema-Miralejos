(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarAct", BuscarAct);
  BuscarAct.$inject = ["$scope", "$state", "$stateParams", "actividadFactory", "NgTableParams","$window", "$filter",  "formLoginFactory"];

    //Controller
    function BuscarAct($scope, $state, $stateParams , actividadFactory,  
        NgTableParams, $window, $filter, formLoginFactory) {
                      
          var $ctrl=this;

          $ctrl.objSearch={
                 criterio:""
          };       

          $ctrl.objDataActividad={};

          $ctrl.objLogin ={};

          Object.defineProperty ( $ctrl.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
          }); // Esto hace que la propiedad type_accion no se pueda modificar

          $ctrl.Init = Init;
          $ctrl.BuscarAct = BuscarAct;
          $ctrl.GoDataEdit = GoDataEdit;

          $ctrl.Init();


          // To configure table   
          //*****************************************************************************//    

              var initialParams = {
                count: 10 // initial page size
              };

              var initialSettings = {
                  paginationMaxBlocks: 13,
                  paginationMinBlocks: 2
              };         
             

          // Initializing    
          //*************************************************************************************// 

          function Init () {

             $ctrl.tableParams = new NgTableParams(initialParams, initialSettings);    

              formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                       angular.isDefined(d.setUrl)?goUrl(d):null;
                                      
                            function goUrl (d) {                                 
                                $state.go( d.setUrl );                               
                            }
              });         
          };

             
          // Searching data        
          //************************************************************************//  

          function BuscarAct (valorIngresado) {     

              $ctrl.boton_submmit=true;

              $ctrl.objSearch.type_accion="buscar_act";              

              $ctrl.objSearch.criterio=valorIngresado;
                
              actividadFactory.buscarAct($ctrl.objSearch).then(function(d) {
             
                $ctrl.tableParams.settings({dataset: d.Respuesta});   
                $ctrl.boton_submmit=false;      
    
              }).catch(function (err) {
                  console.log(err);
              });
                         
          };


          // Bottom Edit     
          //****************************************************************************// 

          function GoDataEdit(row) {             
            
            $ctrl.objDataActividad.type_accion="editar_act";
            $state.go("GestionVentas.modificarAct",{ objdata:row }); 

          };
    
      }// DataSendController

})(window.angular);
