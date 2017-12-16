app.factory('modifydataFactory', function ($http, $sce, $stateParams) {

 var promisemodify, saveobjEdit={};
  

 var ModifyPagosInscriptos = {

     searchDataEdit: function (){
        return saveobjEdit;
     },

      saveDataEdit: function (objEdit){
       
        saveobjEdit=objEdit;
     },


   deleteUser: function(paramObj){
          promisedelete=$http.post('php/eliminarInscripto.php', paramObj).then(function (response) {
                datasmodify=response.data;
                return response.data;
    });
         
        return promisedelete;
  },

  modifyPago: function(paramObj){
        promisemodify=$http.post('php/changepay.php', paramObj).then(function (response) {
              return response.data;
  });
       
      return promisemodify;
}




  };//myService

  return ModifyPagosInscriptos;      
});//  app.factory