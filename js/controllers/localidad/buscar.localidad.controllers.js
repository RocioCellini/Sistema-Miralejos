(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarLocalidad", BuscarLocalidad);
  BuscarLocalidad.$inject = ["$scope", "$state", "$stateParams", "localidadFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

    //Controller
    function BuscarLocalidad($scope, $state, $stateParams , localidadFactory,  
       NgTableParams, $window, $filter, formLoginFactory) {
                    
          var $ctrl=this;

          $ctrl.objSearch={
                 criterio:""
          };       

          $ctrl.objDataLocalidad={};

          $ctrl.objLogin ={};

          Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                value: "checkSession",
                writable: false,
                enumerable: true,
                configurable: false
          }); 

          $ctrl.Init = Init;
          $ctrl.BuscarLocalidad = BuscarLocalidad;
          $ctrl.GoDataEdit = GoDataEdit;
          $ctrl.GoDataDelete = GoDataDelete;          

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
          //*******************************************************************// 

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
          //************************************************************************************//  
          function BuscarLocalidad (valorIngresado) {     

                $ctrl.Mensaje="";
                
                $ctrl.boton_submmit=true;

                $ctrl.objSearch.type_accion="buscar_localidad";              

                $ctrl.objSearch.criterio=valorIngresado;
                  
                localidadFactory.buscarLocalidad($ctrl.objSearch).then(function(d) {

                  $ctrl.tableParams.settings({dataset: d.Respuesta});   

                  $ctrl.boton_submmit=false;      

              }).catch(function (err) {
                  console.log(err);
              });
                         
          };


          // Bottom Edit        
          //**************************************************************************************// 

          function GoDataEdit (row) {             
            
            $ctrl.objDataLocalidad.type_accion="editar_localidad";
            $state.go("GestionVentas.modificarLocalidad",{ objdata:row }); 

          };

          // Bottom Delete 
          //**********************************************************************************************// 

          function GoDataDelete( row ){

            console.log(row);

            $ctrl.objDataLocalidad.type_accion="eliminar_localidad";
            $state.go("GestionVentas.eliminarLocalidad",{ objdata:row }); 

          }
    
      }// DataSendController

})(window.angular);
