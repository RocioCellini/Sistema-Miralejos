(function(_angular) {

      "use strict";

      var app = _angular.module("GestionVentas", ["ngSanitize", "ngAnimate", 
      "ngTable", "ui.router", "ui.bootstrap"]);


      app.config(function($stateProvider, $urlRouterProvider){ 
      // $urlRouterProvider.otherwise('/home');

      $urlRouterProvider.rule(function ($injector, $location) {

      var $state = $injector.get('$state');

      var path = $location.path();
      //normalized = path.toLowerCase();
     
      /*
      if (path==='/xepago') {
        $state.go('GestionVentas.editpago');
      }
      
      if (path==='/xeliminar') {
        $state.go('GestionVentas.eliminaruser');
      }
      */
      });


    $stateProvider.state('GestionVentas', {
      views: {
        'content': {
         template:'<div ui-view></div>'
        },
        'footer': {
          templateUrl: 'templates/footer.html',
          controller: 'FooterController as vf'
        }
      }
    })
      .state('GestionVentas.index',{
        url:'/NuevoCliente',
        templateUrl:'templates/nuevo_cliente.html',
        controller: 'NuevoCliente as $ctrl_nc'
      })
      .state('GestionVentas.editarCliente',{
        url:'/EditarCliente',
        templateUrl:'templates/editar_cliente.html',
        controller: 'EditarCliente as $ctrl_editc'
      })
       .state('GestionVentas.eliminarCliente',{
        url:'/EliminarCliente',
        templateUrl:'templates/eliminar_cliente.html',
        controller: 'EliminarCliente as $ctrl_elimc'
      })/*.state('GestionVentas',{
        url:'/NuevoDpto',
        templateUrl:'templates/nuevo_dpto.html',
        controller: 'NuevoDpto as $ctrl_nd'
      })

       url:'/NuevoCliente',
        templateUrl:'templates/nuevo_cliente.html',
        controller: 'NuevoCliente as $ctrl_nc'
        */;

      }).run(function($state) {
        
        $state.go('GestionVentas.index');
      
      }).controller('FooterController', function() {})

})(window.angular);