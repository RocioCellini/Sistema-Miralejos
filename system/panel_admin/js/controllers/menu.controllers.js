(function (_angular) {

          var app=_angular.module("GestionVentas");

          app.controller('NavigationController', function($scope) {

          var $ctrl_m = this;


          $ctrl_m.itemsMenu = [{
            name: "Estadisticas",
            link: "#",
            subtree: [{
              name: "Ver Estadisticas",
              link: "GestionVentas.estadisticas",
            }]
          }, {
            name: "Planilla",
            link: "#",
            subtree: [{
              name: "Visualizar",
              link: "GestionVentas.planillas"
            }]
          }, {
            name: "Disciplinas",
            link: "#",
            subtree: [{
              name: "Nueva Disciplina",
              link: "../disciplinas.php"
            }]
            },{
            name: "Cooperadora",
            link: "#",
            subtree: [{
              name: "Nuevo Cupon",
              link: "../nuevocupon.php"
            }, {
              name: "Buscar Cajas",
              link: "../buscarcaja.php",

            }]
          },{
            name: "Usuarios",
            link: "#",
            subtree: [{
              name: "Nuevo Usuario",
              link: "../usuarios.php"
            }, {
              name: "Modificar Usuario",
              link: "../buscarusuarios.php",

            },{
              name: "Cerrar Sesion",
              link: "../logout.php",

            }]
            }, {
            name: "Recupero",
            link: "#",
            subtree: [{
              name: "Formulario C1",
              link: "#",
              subtree: [{
                  name: "Nuevo Formulario",
                  link: "#!/nuevo_formulario"
                  }, {
                  name: "Buscar Formularios",
                  link: "#!/listado_formulario"
                  }]
            }]
          }



          ]// $ctrl_m.itemsMenu 

    });// NavigationController


})(window.angular);