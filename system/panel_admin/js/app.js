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
        url:'/Estadisticas',
        templateUrl:'templates/estadistica/estadisticas.html',
        controller: 'Estadistica as $ctrl_e'
      })

       .state('GestionVentas.planilla',{
        url:'/Planilla',
        templateUrl:'templates/planilla/planilla.html',
        controller: 'Planilla as $ctrl_p'
      })
/*
      .state('GestionVentas.planilla.agregar_datos',{
        url:'/AgregarDatos',
        templateUrl:'templates/planilla/agregar_datos.html',
        controller: 'AgregarDatos as $ctrl_ad'
      })
*/
       .state('GestionVentas.buscarCliente',{
        url:'/BuscarCliente',
        templateUrl:'templates/cliente/buscar_cliente.html',
        controller: 'BuscarCliente as $ctrl_bc',

      })

      .state('GestionVentas.nuevoCliente',{
        url:'/NuevoCliente',
        templateUrl:'templates/cliente/abm_cliente.html',
        controller: 'Cliente as $ctrl_c'
      })

      .state('GestionVentas.buscarVendedor',{
        url:'/BuscarVendedor',
        templateUrl:'templates/vendedor/buscar_vendedor.html',
        controller: 'BuscarVendedor as $ctrl_bv'
      }) 

      .state('GestionVentas.nuevoVendedor',{
        url:'/NuevoVendedor',
        templateUrl:'templates/vendedor/abm_vendedor.html',
        controller: 'Vendedor as $ctrl_v'
      }) 

      .state('GestionVentas.buscarEdificio',{
        url:'/BuscarEdificio',
        templateUrl:'templates/edificio/buscar_edificio.html',
        controller: 'BuscarEdificio as $ctrl_be'
      })

      .state('GestionVentas.nuevoEdificio',{
        url:'/NuevoEdificio',
        templateUrl:'templates/edificio/abm_edificio.html',
        controller: 'Edificio as $ctrl_e'
      })

      .state('GestionVentas.buscarPlanta',{
        url:'/BuscarPlanta',
        templateUrl:'templates/planta/buscar_planta.html',
        controller: 'BuscarPlanta as $ctrl_bp'
      })

      .state('GestionVentas.nuevaPlanta',{
        url:'/NuevaPlanta',
        templateUrl:'templates/planta/abm_planta.html',
        controller: 'Planta as $ctrl_p'
      })

      .state('GestionVentas.buscarDpto',{
        url:'/BuscarDpto',
        templateUrl:'templates/dpto/buscar_dpto.html',
        controller: 'BuscarDpto as $ctrl_bd'
      })

      .state('GestionVentas.nuevoDpto',{
        url:'/NuevoDpto',
        templateUrl:'templates/dpto/abm_dpto.html',
        controller: 'Dpto as $ctrl_d'
      })

      .state('GestionVentas.nuevaRelacion',{
        url:'/NuevaRelacion',
        templateUrl:'templates/relacionEPD/nueva_relacion.html',
        controller: 'NuevaRelacion as $ctrl_nr'
      })

      .state('GestionVentas.buscarLocalidad',{
        url:'/BuscarLocalidad',
        templateUrl:'templates/localidad/buscar_localidad.html',
        controller: 'BuscarLocalidad as $ctrl_bloc'
      })

      .state('GestionVentas.nuevaLocalidad',{
        url:'/NuevaLocalidad',
        templateUrl:'templates/localidad/abm_localidad.html',
        controller: 'Localidad as $ctrl_loc'
      })

      .state('GestionVentas.buscarLlamado',{
        url:'/BuscarLlamado',
        templateUrl:'templates/llamado/buscar_llamado.html',
        controller: 'BuscarLlamado as $ctrl_bl'
      })

      .state('GestionVentas.nuevoLlamado',{
        url:'/NuevoLlamado',
        templateUrl:'templates/llamado/abm_llamado.html',
        controller: 'Llamado as $ctrl_ll'
      })
/*
      .state('GestionVentas.cerrarOperacion',{
        url:'/CerrarOperacion',
        templateUrl:'templates/operacion/cerrar_operacion.html',
        controller: 'CerrarOperacion as $ctrl_co'
      })
*/
      .state('GestionVentas.buscarActividad',{
        url:'/BuscarActividad',
        templateUrl:'templates/actividad/buscar_actividad.html',
        controller: 'BuscarAct as $ctrl_ba'
      })

      .state('GestionVentas.nuevaActividad',{
        url:'/NuevaActividad',
        templateUrl:'templates/actividad/abm_actividad.html',
        controller: 'Actividad as $ctrl_a'
      })

   

      }).run(function($state) {
        
        $state.go('GestionVentas.index');
      
      }).controller('FooterController', function() {

      })

      /*.controller('Cliente', ['$scope', function ($scope) {
         var mailList = [
          'john@example.com',
          'jane@example.com',
          'jimmy@example.com' 
          ];
          $scope.isUnique = function(val){
              var res;
              for (var i = 0; i < mailList.length; i++) {
                if (mailList[i] == val) {
                  res = false;
                  break;
                } else res = true;
              }
                return res;
            };
        }]); .directive('unique', [ function() { 
          return { 
                  require: 'ngModel',
                  link: function(scope, elem, attrs, ctrl){
                        var original;
                        ctrl.$formatters.unshift( function(modelValue) {
                                                          original = modelValue;
                                                          return modelValue;
                                                          });
                        ctrl.$parsers.push(function(val){
                              if (val && val !== original) { 
                                ctrl.$setValidity( 'unique' , scope[attrs.unique](val));
                              } 
                              return val;
                            })
                         }
                  };
          }]);
*/

})(window.angular);