(function(_angular) {

  "use strict";

  var app = _angular.module("GestionVentas", ["ngSanitize", "ngAnimate", "ui.navbar",
            "ngTable", "ui.router", "ui.bootstrap"]);

  //usar servicio uiRouterStyles
  app.config(function($stateProvider, $urlRouterProvider){ 
  //$urlRouterProvider.otherwise('/Logueo');

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
              templateUrl: 'templates/menu/menu.html',
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
        url:'/Logueo',
        templateUrl:'templates/formLogueo.html',
        controller: 'LoginController as $ctrl',
      })
/*
      .state('GestionVentas.index',{
        url:'/Estadisticas',
        templateUrl:'templates/estadistica/estadisticas.html',
        controller: 'Estadistica as $ctrl_e'
      })
*/
       .state('GestionVentas.estadisticas',{
        url:'/Estadisticas',
        templateUrl:'templates/estadistica/estadisticas.html',
        controller: 'Estadistica as $ctrl'
      })

       .state('GestionVentas.planilla',{
        url:'/Planilla',
        templateUrl:'templates/planilla/planilla.html',
        controller: 'Planilla as $ctrl'
      })

      .state('GestionVentas.agregarDatos',{
        url:'/AgregarDatos',
        templateUrl:'templates/planilla/agregar_datos.html',
        controller: 'AgregarDatos as $ctrl'
      })

       .state('GestionVentas.buscarCliente',{
        url:'/BuscarCliente',
        templateUrl:'templates/cliente/buscar_cliente.html',
        controller: 'BuscarCliente as $ctrl',

      })

      .state('GestionVentas.nuevoCliente',{
        url:'/NuevoCliente',
        templateUrl:'templates/cliente/abm_cliente.html',
        controller: 'Cliente as $ctrl'
      })

      .state('GestionVentas.buscarVendedor',{
        url:'/BuscarVendedor',
        templateUrl:'templates/vendedor/buscar_vendedor.html',
        controller: 'BuscarVendedor as $ctrl'
      }) 

      .state('GestionVentas.nuevoVendedor',{
        url:'/NuevoVendedor',
        templateUrl:'templates/vendedor/abm_vendedor.html',
        controller: 'Vendedor as $ctrl'
      }) 

      .state('GestionVentas.buscarEdificio',{
        url:'/BuscarEdificio',
        templateUrl:'templates/edificio/buscar_edificio.html',
        controller: 'BuscarEdificio as $ctrl'
      })

      .state('GestionVentas.nuevoEdificio',{
        url:'/NuevoEdificio',
        templateUrl:'templates/edificio/abm_edificio.html',
        controller: 'Edificio as $ctrl'
      })

      .state('GestionVentas.buscarPlanta',{
        url:'/BuscarPlanta',
        templateUrl:'templates/planta/buscar_planta.html',
        controller: 'BuscarPlanta as $ctrl'
      })

      .state('GestionVentas.nuevaPlanta',{
        url:'/NuevaPlanta',
        templateUrl:'templates/planta/abm_planta.html',
        controller: 'Planta as $ctrl'
      })

      .state('GestionVentas.buscarDpto',{
        url:'/BuscarDpto',
        templateUrl:'templates/dpto/buscar_dpto.html',
        controller: 'BuscarDpto as $ctrl'
      })

      .state('GestionVentas.nuevoDpto',{
        url:'/NuevoDpto',
        templateUrl:'templates/dpto/abm_dpto.html',
        controller: 'Dpto as $ctrl'
      })

      .state('GestionVentas.nuevaRelacion',{
        url:'/NuevaRelacion',
        templateUrl:'templates/relacionEPD/nueva_relacion.html',
        controller: 'NuevaRelacion as $ctrl'
      })

      .state('GestionVentas.buscarLocalidad',{
        url:'/BuscarLocalidad',
        templateUrl:'templates/localidad/buscar_localidad.html',
        controller: 'BuscarLocalidad as $ctrl'
      })

      .state('GestionVentas.nuevaLocalidad',{
        url:'/NuevaLocalidad',
        templateUrl:'templates/localidad/abm_localidad.html',
        controller: 'Localidad as $ctrl'
      })

      .state('GestionVentas.buscarLlamado',{
        url:'/BuscarLlamado',
        templateUrl:'templates/llamado/buscar_llamado.html',
        controller: 'BuscarLlamado as $ctrl'
      })

      .state('GestionVentas.nuevoLlamado',{
        url:'/NuevoLlamado',
        templateUrl:'templates/llamado/abm_llamado.html',
        controller: 'Llamado as $ctrl'
      })

      .state('GestionVentas.buscarActividad',{
        url:'/BuscarActividad',
        templateUrl:'templates/actividad/buscar_actividad.html',
        controller: 'BuscarAct as $ctrl'
      })

      .state('GestionVentas.nuevaActividad',{
        url:'/NuevaActividad',
        templateUrl:'templates/actividad/abm_actividad.html',
        controller: 'Actividad as $ctrl'
      })

       .state('GestionVentas.buscarOrigen',{
        url:'/BuscarOrigenDato',
        templateUrl:'templates/origenDato/buscar_origen.html',
        controller: 'BuscarOrigen as $ctrl'
      })

      .state('GestionVentas.nuevoOrigen',{
        url:'/NuevoOrigen',
        templateUrl:'templates/origenDato/abm_origen.html',
        controller: 'OrigenDato as $ctrl'
      }) 

       .state('GestionVentas.logOut',{
        url:'/logOut',
        templateUrl:'templates/cerrar_sesion.html',
        controller: 'LogOutController as $ctrl'
      })   

      }).run(function($state) {
        
        $state.go('GestionVentas.index');
      
      }).controller('FooterController', function() {

      })

})(window.angular);