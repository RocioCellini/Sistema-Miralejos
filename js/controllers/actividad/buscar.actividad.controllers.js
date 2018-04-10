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

                $ctrl.objLogin ={};

                Object.defineProperty ( $ctrl.objLogin, "type_accion", {
                    value: "checkSession",
                    writable: false,
                    enumerable: true,
                    configurable: false
                }); // Esto hace que la propiedad type_accion no se pueda modificar

                $ctrl.Init = Init;
                $ctrl.BuscarAct = BuscarAct;
                $ctrl.EditarAct = EditarAct;

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
          function BuscarAct (valorIngresado) {     

                //console.log(valorIngresado);   

                $ctrl.boton_submmit=true;

                $ctrl.objSearch.type_accion="buscar_act";              

                $ctrl.objSearch.criterio=valorIngresado;

               console.log($ctrl.objSearch);
                  
                actividadFactory.buscarAct($ctrl.objSearch).then(function(d) {

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
          function EditarAct (objuser) {             
            
            // $state.go('GestionVentas.modificarAct');
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


          function EliminarAct (objuser) { 
          };

          function GuardarAct (objuser) { 

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
