var app = angular.module("myAppPanel", ["ngSanitize", "ngAnimate", 
  "ngTable", "ui.router", "ui.bootstrap"]);


app.config(function($stateProvider, $urlRouterProvider){ 
 // $urlRouterProvider.otherwise('/home');
    
   $urlRouterProvider.rule(function ($injector, $location) {
    
    var $state = $injector.get('$state');

    var path = $location.path(),
        normalized = path.toLowerCase();
        console.log(path);
    
   if (path==='/xepago') {
        $state.go('myAppPanel.editpago');
    }
    if (path==='/xeliminar') {
        $state.go('myAppPanel.eliminaruser');
    }
    
  });


  $stateProvider.state('myAppPanel', {
    views: {
      'content': {
        template:'<div ui-view></div>'
      },
       
       'footer': {
         templateUrl: 'templates/footer.html',
         controller: 'FooterController as vf'
       }
       
    }
  }).state('myAppPanel.index',{
      url:'/indexlog',
      templateUrl:'templates/formLogueo.html',
      controller: 'formController as $ctrl'
  }).state('myAppPanel.main',{
      url:'/main',
      templateUrl:'templates/main.html',
      controller: 'BuscarPagos as self'
   }).state('myAppPanel.editpago',{
      url:'/xepago',
      templateUrl:'templates/modificapago.html',
      controller: 'ModifyPago as self'
   }).state('myAppPanel.eliminaruser',{
      url:'/xepago',
      templateUrl:'templates/eliminaruser.html',
      controller: 'DeleteUser as self'
   });

}).run(function($state) {
  $state.go('myAppPanel.index');
}).controller('FooterController', function() {})