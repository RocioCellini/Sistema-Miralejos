(function (_angular) {

    "use strict";

    var app=_angular.module("Historial");

    app.controller("LoginHistorial", LoginHistorial);
    LoginHistorial.$inject = ["$scope","$http","$state","loginFactory"];


        function LoginHistorial($scope, $http, $state, loginFactory) {
            
            var $ctrl=this;
                  
            $ctrl.objLogin={};
            $ctrl.Message="";
            $ctrl.logbutton=false;


            $ctrl.Login = Login;
            $ctrl.Init = Init;


            $ctrl.Init();

         function Init () {
    
              if(loginFactory.getToken()) {

                   $state.go("Historial.buscarPaicente");
               
               }   
         };


           

          function Login () {
            
            $ctrl.logbutton=true;


                  loginFactory.setLogin($ctrl.objLogin).then( function (d) {
                
                          angular.isDefined(d.Message)?enabledButton(d.Message):null;
                          angular.isDefined(d.objlogin)?goUrl(d):null;

                            function enabledButton (d) {
                                $ctrl.Message=d;
                                $ctrl.logbutton=false;
                            }

                            function goUrl (d) { 
                                 //console.log(d.objlogin);                     
                                 loginFactory.setToken(d.objlogin);  
                                 $state.go("Historial.buscarPaicente");
                            }

                    }).catch(function (err) {
                         console.log(err);
             });      
    
           
            } //LogIn 





         
        }// formController


})(window.angular);