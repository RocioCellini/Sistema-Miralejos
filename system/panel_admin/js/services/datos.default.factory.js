(function (_angular){

    "use strict";

    var app=_angular.module("myFomrC1");
    app.factory('defaultdataFactory', function ($http, $stateParams) {
    


    var promisedata, datasearch;

    var formularioc1_defaultdata = {

      buscarVariosChipotes: function(paramsearch) {
          promisedata=$http.post('php/data.default.fc1.php', paramsearch).then(function (response) {
                return response.data;
            });
         
        return promisedata;
      }


    };//myService
    

    return formularioc1_defaultdata;      
    

    });//  app.factory

})(window.angular);