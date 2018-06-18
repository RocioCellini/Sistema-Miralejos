(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarLlamado", BuscarLlamado);

  BuscarLlamado.$inject = ["$scope", "$state", "$stateParams", "llamadoFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

  //Controller
  function BuscarLlamado ( $scope, $state, $stateParams , llamadoFactory,  
     NgTableParams, $window, $filter, formLoginFactory) {
                  
        var $ctrl=this;

        $ctrl.objSearch={
               criterio:""
        };       

        $ctrl.objDataLlamado = {};

        $ctrl.objLogin ={};

        Object.defineProperty ( $ctrl.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
        }); 

        $ctrl.boton_submmit=false;

        $ctrl.popup1 = {
          opened: false
        };

        $ctrl.Init = Init;
        $ctrl.BuscarLlamado = BuscarLlamado;
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
          

        //Show calendary
        //*****************************************************************************//    

        $ctrl.open1 = function() {
          $ctrl.popup1.opened = true;
        };
               
        $ctrl.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
        $ctrl.format = $ctrl.formats[1];
        $ctrl.altInputFormats = ['dd/MM/yyyy'];


       // Searching data        
       //**********************************************************************************************//  
        function BuscarLlamado () {     

            $ctrl.Mensaje="";
            $ctrl.boton_submmit=true;    
            
            var date=$filter('date')($ctrl.dt1, 'yyyy-MM-dd');          
           
            $ctrl.objSearch.type_accion="buscar_llamado";              

            $ctrl.objSearch.criterio=date;            
              
            llamadoFactory.buscarLlamado($ctrl.objSearch).then(function(d) {
           
                angular.isDefined(d.Respuesta[0].Mensaje)?ShowMessage(d):LoadTable(d);
              
                function LoadTable (d) {
                   $ctrl.tableParams.settings({dataset: d.Respuesta})
                }

                function ShowMessage (d) { 
                    $ctrl.Mensaje=d.Respuesta[0].Mensaje;
                }      
                
                $ctrl.boton_submmit=false;      
  
            }).catch(function (err) {

                $ctrl.boton_submmit=false;
                $ctrl.Mensaje="Intente Mas Tarde";  
                console.log(err);
                
            });
                
        };



        // Bottom Edit      
        //*************************************************************************************// 
        
        function GoDataEdit (row) {             

          $ctrl.objDataLlamado.type_accion="editar_llamado";
          $state.go("GestionVentas.modificarLlamado",{ objdata:row }); 

        };

        // Bottom Delete 
        //**********************************************************************************************// 

        function GoDataDelete( row ){

          console.log(row);

          $ctrl.objDataLlamado.type_accion="eliminar_llamado";
          $state.go("GestionVentas.eliminarLlamado",{ objdata:row }); 

        }
    
    }// DataSendController

})(window.angular);
