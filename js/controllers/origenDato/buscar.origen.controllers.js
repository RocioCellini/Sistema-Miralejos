(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarOrigen", BuscarOrigen);

  BuscarOrigen.$inject = ["$scope", "$state", "$stateParams", "origenDatoFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

  //Controller
  function BuscarOrigen ( $scope, $state, $stateParams , origenDatoFactory,  
     NgTableParams, $window, $filter, formLoginFactory) {
                  
        var $ctrl_bo=this;

        $ctrl_bo.objSearch={
               criterio:""
        };       

        $ctrl_bo.objLogin ={};

          Object.defineProperty ( $ctrl_bo.objLogin, "type_accion", {
                value: "checkSession",
                writable: false,
                enumerable: true,
                configurable: false
          }); 

        $ctrl_bo.boton_submmit=false;

        $ctrl_bo.Init = Init;
        $ctrl_bo.BuscarOrigen = BuscarOrigen;
        $ctrl_bo.GoDataEdit = GoDataEdit;

        $ctrl_bo.Init();


    // To configure table   
    //*****************************************************************************//    

        var initialParams = {
          count: 10 // initial page size
        };

        var initialSettings = {
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2
        };              
             

       // To go to modify form for pacient suscribers      
       //**********************************************************************************************// 
        function Init () {

            $ctrl_bo.tableParams = new NgTableParams(initialParams, initialSettings);  

            formLoginFactory.checkSession($ctrl_bo.objLogin).then( function(d) {

                   angular.isDefined(d.setUrl)?goUrl(d):null;
                                  
                        function goUrl (d) {                                 
                            $state.go( d.setUrl );                               
                        }
                        
            });       
        };
          

       // Searching data        
       //**********************************************************************************************//  
        function BuscarOrigen (valorIngresado) {     

                console.log(valorIngresado);   

                $ctrl_bo.boton_submmit=true;

                $ctrl_bo.objSearch.type_accion="buscar_origen";              

                $ctrl_bo.objSearch.criterio=valorIngresado;

               //console.log($ctrl_bo.objSearch);
                  
                origenDatoFactory.buscarOrigen($ctrl_bo.objSearch).then(function(d) {

                //console.log('JSON: '+d);
                console.log($ctrl_bo.objSearch);
                console.log(d.Respuesta); 
               
                $ctrl_bo.tableParams.settings({dataset: d.Respuesta});   

                    // console.log('Datos enviados a tableParams: '+d.Respuesta); 

                $ctrl_bo.boton_submmit=false;      
    
              }).catch(function (err) {
                  console.log(err);
                });           
        };


        // To go to modify form for pacient suscribers      
        //**********************************************************************************************// 
        function GoDataEdit (objuser) {             
          
           // $state.go('GestionVentas.modificarCliente');

        };
    
    }// DataSendController

})(window.angular);
