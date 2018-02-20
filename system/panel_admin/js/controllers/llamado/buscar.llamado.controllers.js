(function(_angular) {
  


  var app=_angular.module("GestionVentas");

  app.controller("BuscarLlamado", BuscarLlamado);


  BuscarLlamado.$inject = ["$scope", "$state", "$stateParams", "llamadoFactory", "NgTableParams","$window", "$filter"];

    
      
        //Controller
        function BuscarLlamado ( $scope, $state, $stateParams , llamadoFactory,  
           NgTableParams, $window, $filter) {
                        
              var $ctrl=this;

              $ctrl.objSearch={
                     criterio:""
              };       

              $ctrl.boton_submmit=false;

              $ctrl.popup1 = {
                opened: false
              };

              $ctrl.Init = Init;
              $ctrl.BuscarLlamado = BuscarLlamado;
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
             

       // To go to modify form for pacient suscribers      
       //**********************************************************************************************// 
        function Init () {
           $ctrl.tableParams = new NgTableParams(initialParams, initialSettings);   
        };

           

            //Show calendary
           //*****************************************************************************//    
 

             $ctrl.open1 = function() {
                $ctrl.popup1.opened = true;

              };

            

              $ctrl.setDate = function(year, month, day) {
                $ctrl.dt1 = new Date(year, month, day)
              
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
               console.log(date);

              
             

              $ctrl.objSearch.type_accion="buscar_llamado";              

              $ctrl.objSearch.criterio=date;

            
                
              llamadoFactory.buscarLlamado($ctrl.objSearch).then(function(d) {


             // Se llama ternaria y reemplaza al if
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



        // To go to modify form for pacient suscribers      
        //**********************************************************************************************// 
        function GoDataEdit (objuser) {             
          
           // $state.go('GestionVentas.modificarCliente');

        };
    
    }// DataSendController

})(window.angular);
