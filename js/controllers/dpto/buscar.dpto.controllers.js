(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarDpto", BuscarDpto);
  BuscarDpto.$inject = ["$scope", "$state", "$stateParams", "dptoFactory", "NgTableParams","$window", "$filter", "formLoginFactory"];

          //Controller
          function BuscarDpto($scope, $state, $stateParams , dptoFactory,  
             NgTableParams, $window, $filter, formLoginFactory) {
                          
                var $ctrl=this;

                $ctrl.objSearch={
                       criterio:""
                };       

                $ctrl.objLogin ={};

                Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                    value: "checkSession",
                    writable: false,
                    enumerable: true,
                    configurable: false
                }); 

                $ctrl.Init = Init;
                $ctrl.BuscarDpto = BuscarDpto;
                $ctrl.EditarDpto = EditarDpto;

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

            formLoginFactory.checkSession($ctrl.objLogin).then( function(d) {

                 angular.isDefined(d.setUrl)?goUrl(d):null;
                                
                      function goUrl (d) {                                 
                          $state.go( d.setUrl );                               
                      }
                      
            });        
      
          };

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarDpto (valorIngresado) {     

                //console.log(valorIngresado);   

                $ctrl.boton_submmit=true;

                $ctrl.objSearch.type_accion="buscar_dpto";              

                $ctrl.objSearch.criterio=valorIngresado;

               //console.log($ctrl.objSearch);
                  
                dptoFactory.buscarDpto($ctrl.objSearch).then(function(d) {

                //console.log('JSON: '+d);
               // console.log(d.Respuesta); 
               
                $ctrl.tableParams.settings({dataset: d.Respuesta});   

                    // console.log('Datos enviados a tableParams: '+d.Respuesta); 

                $ctrl.boton_submmit=false;      
    
              }).catch(function (err) {
                  console.log(err);
                });
                         
          };


          // To go to modify form for pacient suscribers      
         //**********************************************************************************************// 
          function EditarDpto (objuser) {             
            
            // $state.go('GestionVentas.modificarDpto');
            var celda = document.getElementsByTagName("td");
            var contenido = document.getElementsByTagName("td")[0].textContent;
            
            //celda.appendChild(document.createElement("input"));  //celda.appendChild is not a function

            celda.item(0).innerHTML='<input type="text" class="form-control">'; 
            //var parrafo= document.getElementsByTagName("input").appendChild('p');
            //parrafo.textContent=contenido;
            //document.getElementsByTagName("input").textContent=contenido;

            console.log(contenido);
            console.log(celda.item(0));
            console.log(objuser.nombre);

          };


          function EliminarDpto (objuser) { 
          };

          function GuardarDpto (objuser) { 

            /*    $ctrl.boton_submmit=true;

                $ctrl.objSearch.type_accion="guardar_dpto";              
                  
                dptoFactory.guardarCambiosDpto($ctrl.objSearch).then(function(d) {
               
                $ctrl.tableParams.settings({dataset: d.Respuesta});   

                $ctrl.boton_submmit=false;      
    
              }).catch(function (err) {
                  console.log(err);
                });
            */
          };
    
      }// DataSendController

})(window.angular);
