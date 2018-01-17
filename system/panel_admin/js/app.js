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
        url:'/NuevaRelacion',
        templateUrl:'templates/nueva_ti_dpto.html',
        controller: 'NuevaRelacion as $ctrl_nr'
      })

/*
    .state('GestionVentas.index',{
        url:'/NuevaRelacion',
        templateUrl:'templates/nueva_ti_dpto.html',
        controller: 'NuevaRelacion as $ctrl_nr'
      })



    .state('GestionVentas.index',{
        url:'/NuevoCliente',
        templateUrl:'templates/nuevo_cliente.html',
        controller: 'NuevoCliente as $ctrl_nc'
      })

    .state('GestionVentas.index',{
        url:'/NuevoLlamado',
        templateUrl:'templates/nuevo_llamado.html',
        controller: 'NuevoLlamado as $ctrl_nl'
      })

     .state('GestionVentas.index',{
        url:'/NuevoCliente',
        templateUrl:'templates/nuevo_cliente.html',
        controller: 'NuevoCliente as $ctrl_nc'
      })

    .state('GestionVentas.index',{
        url:'/NuevaPlanta',
        templateUrl:'templates/nueva_planta.html',
        controller: 'NuevaPlanta as $ctrl_np'
      })


    .state('GestionVentas.index',{
        url:'/CerrarOperacion',
        templateUrl:'templates/cerrar_operacion.html',
        controller: 'CerrarOperacion as $ctrl_co'
      })


    .state('GestionVentas.index',{
        url:'/NuevoEdificio',
        templateUrl:'templates/nuevo_edificio.html',
        controller: 'NuevoEdificio as $ctrl_ne'
      })
 
     .state('GestionVentas.index',{
        url:'/NuevaLocalidad',
        templateUrl:'templates/nueva_localidad.html',
        controller: 'NuevaLocalidad as $ctrl_nloc'
      })
      .state('GestionVentas.index',{
        url:'/NuevoDpto',
        templateUrl:'templates/nuevo_dpto.html',
        controller: 'NuevoDpto as $ctrl_nd'
      })
     .state('GestionVentas.index',{
        url:'/NuevoVendedor',
        templateUrl:'templates/nuevo_vendedor.html',
        controller: 'NuevoVendedor as $ctrl_nv'
      })    
     .state('GestionVentas.index',{
        url:'/NuevoLlamado',
        templateUrl:'templates/nuevo_llamado.html',
        controller: 'NuevoLlamado as $ctrl_nl'
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
      })
      
      .state('GestionVentas',{
        url:'/NuevoDpto',
        templateUrl:'templates/nuevo_dpto.html',
        controller: 'NuevoDpto as $ctrl_nd'
      })

       url:'/NuevoCliente',
        templateUrl:'templates/nuevo_cliente.html',
        controller: 'NuevoCliente as $ctrl_nc'
      */ ;

      }).run(function($state) {
        
        $state.go('GestionVentas.index');
      
      }).controller('FooterController', function() {})

})(window.angular);