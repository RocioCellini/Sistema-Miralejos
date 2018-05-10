(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarOrigen", BuscarOrigen);

  BuscarOrigen.$inject = ["$scope", "$state", "$stateParams", "origenDatoFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

  //Controller
  function BuscarOrigen ( $scope, $state, $stateParams , origenDatoFactory,  
     NgTableParams, $window, $filter, formLoginFactory) {
                  
        var $ctrl=this;

        $ctrl.objSearch={
               criterio:""
        };       

        $ctrl.objDataOrigen={};

        $ctrl.objLogin ={};

          Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                value: "checkSession",
                writable: false,
                enumerable: true,
                configurable: false
          }); 

        $ctrl.boton_submmit=false;

        $ctrl.Init = Init;
        $ctrl.BuscarOrigen = BuscarOrigen;
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
        //******************************************************************************// 

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
       //**********************************************************************************************//  
        function BuscarOrigen (valorIngresado) {     

            $ctrl.boton_submmit=true;

            $ctrl.objSearch.type_accion="buscar_origen";              

            $ctrl.objSearch.criterio=valorIngresado;
              
            origenDatoFactory.buscarOrigen($ctrl.objSearch).then(function(d) {
           
              $ctrl.tableParams.settings({dataset: d.Respuesta});   
              $ctrl.boton_submmit=false;      

            }).catch(function (err) {
              console.log(err);
            });           
        };


        // Bottom Edit      
        //*************************************************************************************// 
        
        function GoDataEdit (row) {             
          
          $ctrl.objDataOrigen.type_accion="editar_origen";
          $state.go("GestionVentas.modificarOrigen",{ objdata:row }); 

        };

        // Bottom Delete 
        //**********************************************************************************************// 

        function GoDataDelete( row ){

          console.log(row);

          $ctrl.objDataOrigen.type_accion="eliminar_origen";
          $state.go("GestionVentas.eliminarOrigen",{ objdata:row }); 

        }
    
    }// DataSendController

})(window.angular);
