(function(_angular) {

  "use strict";

  var app = _angular.module("GestionVentas", ["ngSanitize", "ngAnimate", "ui.navbar",
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
          'nav': {
              templateUrl: 'templates/menu.html',
              controller: 'NavigationController as $ctrl_m' 
          },
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
        url:'/Estadisticas',
        templateUrl:'templates/estadisticas.html',
        controller: 'Estadisticas as $ctrl_e'
      })

       .state('GestionVentas.planilla',{
        url:'/Planilla',
        templateUrl:'templates/planilla.html',
        controller: 'Planilla as $ctrl_p'
      })

       .state('GestionVentas.buscarContacto',{
        url:'/BuscarContacto',
        templateUrl:'templates/buscar_contacto.html',
        controller: 'BuscarContacto as $ctrl_bc'
      })

      .state('GestionVentas.nuevoContacto',{
        url:'/NuevoContacto',
        templateUrl:'templates/nuevo_contacto.html',
        controller: 'NuevoCliente as $ctrl_nc'
      })

      .state('GestionVentas.buscarVendedor',{
        url:'/BuscarVendedor',
        templateUrl:'templates/buscar_vendedor.html',
        controller: 'BuscarVendedor as $ctrl_bv'
      }) 

      .state('GestionVentas.nuevoVendedor',{
        url:'/NuevoVendedor',
        templateUrl:'templates/nuevo_vendedor.html',
        controller: 'NuevoVendedor as $ctrl_nv'
      }) 

      .state('GestionVentas.buscarEdificio',{
        url:'/BuscarEdificio',
        templateUrl:'templates/buscar_edificio.html',
        controller: 'BuscarEdificio as $ctrl_be'
      })

      .state('GestionVentas.nuevoEdificio',{
        url:'/NuevoEdificio',
        templateUrl:'templates/nuevo_edificio.html',
        controller: 'NuevoEdificio as $ctrl_ne'
      })

      .state('GestionVentas.buscarPlanta',{
        url:'/BuscarPlanta',
        templateUrl:'templates/buscar_planta.html',
        controller: 'BuscarPlanta as $ctrl_bp'
      })

      .state('GestionVentas.nuevaPlanta',{
        url:'/NuevaPlanta',
        templateUrl:'templates/nueva_planta.html',
        controller: 'NuevaPlanta as $ctrl_np'
      })

      .state('GestionVentas.buscarDpto',{
        url:'/BuscarDpto',
        templateUrl:'templates/buscar_dpto.html',
        controller: 'BuscarDpto as $ctrl_bd'
      })

      .state('GestionVentas.nuevoDpto',{
        url:'/NuevoDpto',
        templateUrl:'templates/nuevo_dpto.html',
        controller: 'NuevoDpto as $ctrl_nd'
      })

      .state('GestionVentas.nuevaRelacion',{
        url:'/NuevaRelacion',
        templateUrl:'templates/nueva_relacion.html',
        controller: 'NuevaRelacion as $ctrl_nr'
      })

      .state('GestionVentas.buscarLocalidad',{
        url:'/BuscarLocalidad',
        templateUrl:'templates/buscar_localidad.html',
        controller: 'BuscarLocalidad as $ctrl_bloc'
      })

      .state('GestionVentas.nuevaLocalidad',{
        url:'/NuevaLocalidad',
        templateUrl:'templates/nueva_localidad.html',
        controller: 'NuevaLocalidad as $ctrl_nloc'
      })

      .state('GestionVentas.BuscarLlamado',{
        url:'/BuscarLlamado',
        templateUrl:'templates/buscar_llamado.html',
        controller: 'BuscarLlamado as $ctrl_bl'
      })

      .state('GestionVentas.nuevoLlamado',{
        url:'/NuevoLlamado',
        templateUrl:'templates/nuevo_llamado.html',
        controller: 'NuevoLlamado as $ctrl_nl'
      })

      .state('GestionVentas.cerrarOperacion',{
        url:'/CerrarOperacion',
        templateUrl:'templates/cerrar_operacion.html',
        controller: 'CerrarOperacion as $ctrl_co'
      })

   

      }).run(function($state) {
        
        $state.go('GestionVentas.index');
      
      }).controller('FooterController', function() {})

})(window.angular);