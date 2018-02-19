(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarLlamado", BuscarLlamado);
  BuscarLlamado.$inject = ["$scope", "$state", "$stateParams", "llamadoFactory", "NgTableParams","$window", "$filter"];

        //Show calendary
        //*****************************************************************************//    

        self.open1 = function() {
                self.popup1.opened = true;
              };

              self.open2 = function() {
                 self.popup2.opened = true;
              };

              self.setDate = function(year, month, day) {
                self.dt1 = new Date(year, month, day)
                self.dt2 = new Date(year, month, day);
              };

              self.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
              self.format = self.formats[1];
              self.altInputFormats = ['dd/MM/yyyy'];

              self.popup1 = {
                opened: false
              };

              self.popup2 = {
                opened: false
              };    

        //Controller
        function BuscarLlamado($scope, $state, $stateParams , llamadoFactory,  
           NgTableParams, $window, $filter) {
                        
              var $ctrl_bl=this;

              $ctrl_bl.objSearch={
                     criterio:""
              };       

              $ctrl_bl.Init = Init;
              $ctrl_bl.BuscarLlamado = BuscarLlamado;
              $ctrl_bl.GoDataEdit = GoDataEdit;

              $ctrl_bl.Init();


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
           $ctrl_bl.tableParams = new NgTableParams(initialParams, initialSettings);   
        };

           
       // Searching data        
       //**********************************************************************************************//  
        function BuscarLlamado (valorIngresado) {     

              //console.log(valorIngresado);   

              $ctrl_bl.boton_submmit=true;

              $ctrl_bl.objSearch.type_accion="buscar_llamado";              

              $ctrl_bl.objSearch.criterio=valorIngresado;

              //console.log($ctrl_bl.objSearch);
                
              llamadoFactory.buscarLlamado($ctrl_bl.objSearch).then(function(d) {

              //console.log('JSON: '+d);
              //console.log(d.Respuesta); 
             
              $ctrl_bl.tableParams.settings({dataset: d.Respuesta});   

                  // console.log('Datos enviados a tableParams: '+d.Respuesta); 

              $ctrl_bl.boton_submmit=false;      
  
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
