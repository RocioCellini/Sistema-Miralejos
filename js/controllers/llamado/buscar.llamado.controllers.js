(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarLlamado", BuscarLlamado);

  BuscarLlamado.$inject = ["$scope", "$state", "$stateParams", "llamadoFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

  //Controller
  function BuscarLlamado ( $scope, $state, $stateParams , llamadoFactory,  
     NgTableParams, $window, $filter, formLoginFactory) {
                  
        var $ctrl_bll=this;

        $ctrl_bll.objSearch={
               criterio:""
        };       

        $ctrl_bll.objLogin ={};

        Object.defineProperty ( $ctrl_bll.objLogin, "type_accion", {
              value: "checkSession",
              writable: false,
              enumerable: true,
              configurable: false
        }); 

        $ctrl_bll.boton_submmit=false;

        $ctrl_bll.popup1 = {
          opened: false
        };

        $ctrl_bll.Init = Init;
        $ctrl_bll.BuscarLlamado = BuscarLlamado;
        $ctrl_bll.GoDataEdit = GoDataEdit;

        $ctrl_bll.Init();


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

           $ctrl_bll.tableParams = new NgTableParams(initialParams, initialSettings);   

           formLoginFactory.checkSession($ctrl_bll.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                      
            });    
        };
          

        //Show calendary
        //*****************************************************************************//    

        $ctrl_bll.open1 = function() {
          $ctrl_bll.popup1.opened = true;
        };

        $ctrl_bll.setDate = function(year, month, day) {
          $ctrl_bll.dt1 = new Date(year, month, day)
        };

        $ctrl_bll.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
        $ctrl_bll.format = $ctrl_bll.formats[1];
        $ctrl_bll.altInputFormats = ['dd/MM/yyyy'];


       // Searching data        
       //**********************************************************************************************//  
        function BuscarLlamado () {     

              $ctrl_bll.Mensaje="";
              $ctrl_bll.boton_submmit=true;    
              
              var date=$filter('date')($ctrl_bll.dt1, 'yyyy-MM-dd');
              console.log(date);              
             
              $ctrl_bll.objSearch.type_accion="buscar_llamado";              

              $ctrl_bll.objSearch.criterio=date;
            
                
              llamadoFactory.buscarLlamado($ctrl_bll.objSearch).then(function(d) {

             // Se llama ternaria y reemplaza al if
              angular.isDefined(d.Respuesta[0].Mensaje)?ShowMessage(d):LoadTable(d);
            
              function LoadTable (d) {
                 $ctrl_bll.tableParams.settings({dataset: d.Respuesta})
              }

              function ShowMessage (d) { 
                  $ctrl_bll.Mensaje=d.Respuesta[0].Mensaje;
              }      
        
              $ctrl_bll.boton_submmit=false;      
  
            }).catch(function (err) {
               $ctrl_bll.boton_submmit=false;
                $ctrl_bll.Mensaje="Intente Mas Tarde";  
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
