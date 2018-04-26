(function(_angular) {

  "use strict";

  var app = _angular.module("GestionVentas", ["ngSanitize", "ngAnimate", "ui.navbar",
            "ngTable", "ui.router", "ui.bootstrap"]);

  app.config(function($stateProvider, $urlRouterProvider){ 

      $urlRouterProvider.rule(function ($injector, $location) {

      var $state = $injector.get('$state');

      var path = $location.path();

      });


      $stateProvider.state('GestionVentas', {
        views: {
          'nav': {
              templateUrl: 'templates/menu/menu.html',
              controller: 'NavigationController as $ctrl' 
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
      .state('GestionVentas.estadisticas',{
        url:'/Estadisticas',
        templateUrl:'templates/estadistica/estadisticas.html',
        controller: 'Estadistica as $ctrl'
      })
*/
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

      .state('GestionVentas.importar',{
        url:'/ImportarPlanilla',
        templateUrl:'templates/planilla/importar_planilla.html',
        controller: 'Importar as $ctrl'
      })

       .state('GestionVentas.buscarCliente',{
        url:'/BuscarCliente',
        templateUrl:'templates/cliente/buscar_cliente.html',
        controller: 'BuscarCliente as $ctrl',

      }) 

      .state('GestionVentas.nuevoCliente',{
        url:'/NuevoCliente',
        templateUrl:'templates/cliente/abm_cliente.html',
        controller: 'Cliente as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevoCliente"
              }
      })

      .state('GestionVentas.modificarCliente', {
        url:'/ModificarCliente',
        templateUrl:'templates/cliente/abm_cliente.html',
        controller: 'Cliente as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarCliente",
                  objdata:null
              }
      })

      .state('GestionVentas.buscarVendedor',{
        url:'/BuscarVendedor',
        templateUrl:'templates/vendedor/buscar_vendedor.html',
        controller: 'BuscarVendedor as $ctrl'
      }) 

      .state('GestionVentas.nuevoVendedor',{
        url:'/NuevoVendedor',
        templateUrl:'templates/vendedor/abm_vendedor.html',
        controller: 'Vendedor as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevoVendedor"
              }
      }) 

      .state('GestionVentas.modificarVendedor', {
        url:'/ModificarVendedor',
        templateUrl:'templates/vendedor/abm_vendedor.html',
        controller: 'Vendedor as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarVendedor",
                  objdata:null
              }
      })

       .state('GestionVentas.buscarInmob',{
        url:'/BuscarInmobiliaria',
        templateUrl:'templates/inmobiliaria/buscar_inmobiliaria.html',
        controller: 'BuscarInmobiliaria as $ctrl'
      }) 

      .state('GestionVentas.nuevaInmob',{
        url:'/NuevaInmobiliaria',
        templateUrl:'templates/inmobiliaria/abm_inmobiliaria.html',
        controller: 'Inmobiliaria as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevaInmob"
              }
      }) 

      .state('GestionVentas.modificarInmob', {
        url:'/ModificarInmobiliaria',
        templateUrl:'templates/inmobiliaria/abm_inmobiliaria.html',
        controller: 'Inmobiliaria as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarInmob",
                  objdata:null
              }
      })

      .state('GestionVentas.buscarEdificio',{
        url:'/BuscarEdificio',
        templateUrl:'templates/edificio/buscar_edificio.html',
        controller: 'BuscarEdificio as $ctrl'
      })

      .state('GestionVentas.nuevoEdificio',{
        url:'/NuevoEdificio',
        templateUrl:'templates/edificio/abm_edificio.html',
        controller: 'Edificio as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevoEdificio"
              }
      })

      .state('GestionVentas.modificarEdificio', {
        url:'/ModificarEdificio',
        templateUrl:'templates/edificio/abm_edificio.html',
        controller: 'Edificio as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarEdificio",
                  objdata:null
              }
      })

      .state('GestionVentas.buscarPlanta',{
        url:'/BuscarPlanta',
        templateUrl:'templates/planta/buscar_planta.html',
        controller: 'BuscarPlanta as $ctrl'
      })

      .state('GestionVentas.nuevaPlanta',{
        url:'/NuevaPlanta',
        templateUrl:'templates/planta/abm_planta.html',
        controller: 'Planta as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevaPlanta"
              }
      })

      .state('GestionVentas.modificarPlanta', {
        url:'/ModificarPlanta',
        templateUrl:'templates/planta/abm_planta.html',
        controller: 'Planta as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarPlanta",
                  objdata:null
              }
      })

      .state('GestionVentas.buscarDpto',{
        url:'/BuscarDpto',
        templateUrl:'templates/dpto/buscar_dpto.html',
        controller: 'BuscarDpto as $ctrl'
      })

      .state('GestionVentas.nuevoDpto',{
        url:'/NuevoDpto',
        templateUrl:'templates/dpto/abm_dpto.html',
        controller: 'Dpto as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevoDpto"
              }
      })

      .state('GestionVentas.modificarDpto', {
        url:'/ModificarDpto',
        templateUrl:'templates/dpto/abm_dpto.html',
        controller: 'Dpto as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarDpto",
                  objdata:null
              }
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
        controller: 'Localidad as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevaLocalidad"
              }
      })

      .state('GestionVentas.modificarLocalidad', {
        url:'/ModificarLocalidad',
        templateUrl:'templates/localidad/abm_localidad.html',
        controller: 'Localidad as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarLocalidad",
                  objdata:null
              }
      })

      .state('GestionVentas.buscarLlamado',{
        url:'/BuscarLlamado',
        templateUrl:'templates/llamado/buscar_llamado.html',
        controller: 'BuscarLlamado as $ctrl'
      })

      .state('GestionVentas.nuevoLlamado',{
        url:'/NuevoLlamado',
        templateUrl:'templates/llamado/abm_llamado.html',
        controller: 'Llamado as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevoLlamado"
              }
      })

      .state('GestionVentas.modificarLlamado', {
        url:'/ModificarLlamado',
        templateUrl:'templates/llamado/abm_llamado.html',
        controller: 'Llamado as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarLlamado",
                  objdata:null
              }
      })

      .state('GestionVentas.buscarActividad',{
        url:'/BuscarActividad',
        templateUrl:'templates/actividad/buscar_actividad.html',
        controller: 'BuscarAct as $ctrl'
      })

      .state('GestionVentas.nuevaActividad',{
        url:'/NuevaActividad',
        templateUrl:'templates/actividad/abm_actividad.html',
        controller: 'Actividad as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevaActividad"
              }
      })

       .state('GestionVentas.modificarAct', {
        url:'/ModificarActividad',
        templateUrl:'templates/actividad/abm_actividad.html',
        controller: 'Actividad as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarAct",
                  objdata:null
              }
      })

      .state('GestionVentas.buscarOrigen',{
        url:'/BuscarOrigenDato',
        templateUrl:'templates/origenDato/buscar_origen.html',
        controller: 'BuscarOrigen as $ctrl'
      })

      .state('GestionVentas.nuevoOrigen',{
        url:'/NuevoOrigen',
        templateUrl:'templates/origenDato/abm_origen.html',
        controller: 'OrigenDato as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.nuevoOrigen"
              }
      }) 

      .state('GestionVentas.modificarOrigen', {
        url:'/ModificarOrigenDato',
        templateUrl:'templates/origenDato/abm_origen.html',
        controller: 'OrigenDato as $ctrl',
        params: {
                  type_ingreso:"GestionVentas.modificarOrigen",
                  objdata:null
              }
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