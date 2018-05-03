************************************************************************************************//

user:miralejos
password: adminFlor7

******************************************************************************

Ejemplos de Filtros Angular
http://www.javasavvy.com/angularjs-filter-service-examples/

Página ng-table
//http://ng-table.com/#/

Para poner hojas de estilos desde el app usar el servicio uiRouterStyles

******************************************************************************

Nota 1: En los templates, el atributo ng-options usa option.name y option.id, que son los valores del array que está en el php correspondiente. Por ejemplo abm_localidad.html tiene su array en datos_relacionados.php 

Nota 2: Lo siguiente se llama ternaria y reemplaza al if. Está hecho en buscar.lamado.controllers.js

        angular.isDefined(d.Respuesta[0].Mensaje)?ShowMessage(d):LoadTable(d);
      
        function LoadTable (d) {
           $ctrl.tableParams.settings({dataset: d.Respuesta})
        }

        function ShowMessage (d) { 
            $ctrl.Mensaje=d.Respuesta[0].Mensaje;
        }     

Nota 3:  //ES6 La variable CONST
            const metodo=$stateParams.type_ingreso.split(".");
           
            /* clienteFactory[modificarCliente] Es para acceder a la propiedad de un Object mediante variable, de forma implícita, sin aclarar cuál es el nombre de dicha propiedad */
                    
            clienteFactory[metodo[1]]( $ctrl.objDataCliente ).then(function(d) {   

            $ctrl.Mensaje=d.Mensaje;
        
             }).catch(function (err) {
                  console.log(err);
             });    

Nota4:

  <footer class="navbar-default">
  <div class="container-fluid">
    <div class="footer">
      <div class="col-md-4 col-sm-4 col-lg-4">
        <p id="footerLeft">info@miralejos.net - (3541) 583484</p>
      </div>
      <div class="col-md-4 col-sm-4 col-lg-4"></div>
      <div class="col-md-4 col-sm-4 col-lg-4">
        <p id="footerRight">Producted by <span class="marca">Cellini</span></p>
      </div>
    </div>
  </div>
</footer>


**********************************************************************************************
Error al loguearse en el sistema
Msj al hacer clic sobre formLogueo.php:

    <b>Deprecated</b>:  Automatically populating $HTTP_RAW_POST_DATA is deprecated and will be removed in a future version. To avoid this warning set 'always_populate_raw_post_data' to '-1' in php.ini and use the php://input stream instead. in <b>Unknown</b> on line <b>0</b><br />
    <b>Warning</b>:  Cannot modify header information - headers already sent in <b>Unknown</b> on line <b>0</b>

en la ruta: wamp/.../php.ini buscar donde dice "$HTTP_RAW_POST_DATA" y descomentar(borrando el ;) la última linea

Codigo en Planilla

   function cancel(row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(row, originalRow);
  }

        function del(row) {
            _.remove(self.tableParams.settings().dataset, function(item) {
              return row === item;
            });
            self.tableParams.reload().then( function(data) {
              if (data.length === 0 && self.tableParams.total() > 0) {
                self.tableParams.page(self.tableParams.page() - 1);
                self.tableParams.reload();
              }
            });
        }
          
        function resetRow(row, rowForm){
            row.isEditing = false;
            rowForm.$setPristine();
            self.tableTracker.untrack(row);
            return _.findWhere(originalData, function(r){
              return r.id === row.id;
            });
        }

        function save(row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(originalRow, row);
        }

