app.factory('buscardataFactory', function ($http, $stateParams) {
  var promisepost, datasearch;
  
  var self=this;
   self.tagTable={
      edit:"Edit",
      delete:"Delete"
  }  

  // Just For Now The Config of The Table
 

  var ServicePagosInscriptos = {

      SaveData:function (){
        for (var i=0;i<=datasearch.length-1;i++) {
            i===datasearch.length?i=datasearch.length+1:null;
            if(datasearch[i].Dni_Inscripto!=="Sin Resultados"){
                  datasearch[i].Edit=self.tagTable.edit;
                  datasearch[i].Delete=self.tagTable.delete;
            }
           
        }
           return datasearch;
      },
     
     
      buscarPagosInscriptos: function(paramsearch){
          promisepost=$http.post('php/buscarpagos.php', paramsearch).then(function (response) {
                datasearch=response.data.Pagos_Inscriptos;
                return response.data;
            });
         
        return promisepost;
      }


  };//myService
  return ServicePagosInscriptos;      
});//  app.factory