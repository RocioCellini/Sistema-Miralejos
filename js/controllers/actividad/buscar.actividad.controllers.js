(function(_angular) {
  
  var app=_angular.module("GestionVentas");

  app.controller("BuscarAct", BuscarAct);
  BuscarAct.$inject = ["$scope", "$state", "$stateParams", "actividadFactory", "NgTableParams","$window", "$filter"];

          //Controller
          function BuscarAct($scope, $state, $stateParams , actividadFactory,  
             NgTableParams, $window, $filter) {
                          
                var $ctrl_ba=this;

                $ctrl_ba.objSearch={
                       criterio:""
                };       

                $ctrl_ba.Init = Init;
                $ctrl_ba.BuscarAct = BuscarAct;
                $ctrl_ba.EditarAct = EditarAct;

                $ctrl_ba.Init();


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

             $ctrl_ba.tableParams = new NgTableParams(initialParams, initialSettings);            
      
          };

             
         // Searching data        
         //**********************************************************************************************//  
          function BuscarAct (valorIngresado) {     

                //console.log(valorIngresado);   

                $ctrl_ba.boton_submmit=true;

                $ctrl_ba.objSearch.type_accion="buscar_act";              

                $ctrl_ba.objSearch.criterio=valorIngresado;

               console.log($ctrl_ba.objSearch);
                  
                actividadFactory.buscarAct($ctrl_ba.objSearch).then(function(d) {

                //console.log('JSON: '+d);
               // console.log(d.Respuesta); 
               
                $ctrl_ba.tableParams.settings({dataset: d.Respuesta});   

                    // console.log('Datos enviados a tableParams: '+d.Respuesta); 

                $ctrl_ba.boton_submmit=false;      
    
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

            /*    $ctrl_ba.boton_submmit=true;

                $ctrl_ba.objSearch.type_accion="guardar_dpto";              
                  
                dptoFactory.guardarCambiosDpto($ctrl_ba.objSearch).then(function(d) {
               
                $ctrl_ba.tableParams.settings({dataset: d.Respuesta});   

                $ctrl_ba.boton_submmit=false;      
    
              }).catch(function (err) {
                  console.log(err);
                });
            */
          };
    
      }// DataSendController

})(window.angular);
