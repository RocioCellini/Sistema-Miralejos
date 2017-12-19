(function(_angular) {

      "use strict";


      var app = _angular.module("myFomrC1", ["ngSanitize", "ngAnimate", 
      "ngTable", "ui.router", "ui.bootstrap"]);


      app.config(function($stateProvider, $urlRouterProvider){ 
      // $urlRouterProvider.otherwise('/home');

      $urlRouterProvider.rule(function ($injector, $location) {

      var $state = $injector.get('$state');

      var path = $location.path(),
      normalized = path.toLowerCase();
     

      if (path==='/xepago') {
        $state.go('myFomrC1.editpago');
      }
      
      if (path==='/xeliminar') {
        $state.go('myFomrC1.eliminaruser');
      }

      });


      $stateProvider.state('myFomrC1', {
      views: {
      'content': {
       template:'<div ui-view></div>'
      },

      'footer': {
        templateUrl: 'templates/footer.html',
        controller: 'FooterController as vf'
      }

      }
      }).state('myFomrC1.index',{
      url:'/ingreso_paciente',
        templateUrl:'templates/ingresoPaciente.html',
        controller: 'IngresoPaciente as $ctrl_ip'
      }).state('myFomrC1.modificaPaciente',{
        url:'/modifica_paciente',
        templateUrl:'templates/modificaPaciente.html',
        controller: 'ModifyPciente as $ctrl_mp'
      })
      .state('myFomrC1.main',{
        url:'/busca_paciente',
        templateUrl:'templates/buscarPaciente.html',
        controller: 'BuscarPaCiente as $ctrl_bp'
      });

      }).run(function($state) {
        
        $state.go('myFomrC1.index');
      
      }).controller('FooterController', function() {})




})(window.angular);