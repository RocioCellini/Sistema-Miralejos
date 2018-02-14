(function (_angular) {

          var app=_angular.module("GestionVentas");

          app.controller('NavigationController', function($scope) {

          var $ctrl_m = this;


          $ctrl_m.itemsMenu = [{
            name: "Estadisticas",
            link: "#",
            subtree: [{
              name: "Ver Estadisticas",
              link: "GestionVentas.index",
            }]
          }, {
            name: "Planilla",
            link: "#",
            subtree: [{
              name: "Visualizar",
              link: "GestionVentas.planilla"
            }]
          }, {
            name: "Contactos",
            link: "#",
            subtree: [{
              name: "Buscar",
              link: "GestionVentas.buscarCliente"
            },
            {
              name: "Añadir",
              link: "GestionVentas.nuevoCliente"
            }]
          },{
            name: "Vendedores",
            link: "#",
             subtree: [{
              name: "Buscar",
              link: "GestionVentas.buscarVendedor"
            },
            {
              name: "Añadir",
              link: "GestionVentas.nuevoVendedor"
            }]
          },{
            name: "Relación EPD",
            link: "#",
            subtree: [{
              name: "Edificios",
              link: "GestionVentas.edificios",
              subtree: [{
                          name: "Buscar",
                          link: "GestionVentas.buscarEdificio"
                        },
                        {
                          name: "Añadir",
                          link: "GestionVentas.nuevoEdificio"
                        }]
              },{
              name: "Plantas",
              link: "GestionVentas.plantas",
              subtree: [{
                          name: "Buscar",
                          link: "GestionVentas.buscarPlanta"
                        },
                        {
                          name: "Añadir",
                          link: "GestionVentas.nuevaPlanta"
                        }]
              },{
              name: "Dptos",
              link: "GestionVentas.dptos",
              subtree: [{
                          name: "Buscar",
                          link: "GestionVentas.buscarDpto"
                        },
                        {
                          name: "Añadir",
                          link: "GestionVentas.nuevoDpto"
                        }]
              },{
              name: "Añadir Relación",
              link: "GestionVentas.nuevaRelacion"
            }]
          },{
            name: "Localidades",
            link: "#",
            subtree: [{
              name: "Buscar",
              link: "GestionVentas.buscarLocalidad"
            },
            {
              name: "Añadir",
              link: "GestionVentas.nuevaLocalidad"
            }]
          },{
            name: "Llamados",
            link: "#",
            subtree: [{
              name: "Buscar",
              link: "GestionVentas.buscarLlamado"
            },
            {
              name: "Añadir",
              link: "GestionVentas.nuevoLlamado"
            }]
          },{
            name: "Cierre de Operación",
            link: "#",
            subtree: [{
              name: "Cerrar Operación",
              link: "GestionVentas.cerrarOperacion"
            }]
          },{
            name: "Actividad",
            link: "#",
            subtree: [{
              name: "Buscar",
              link: "GestionVentas.buscarActividad"
            },
            {
              name: "Añadir",
              link: "GestionVentas.nuevaActividad"
            }]
          }


          ]// $ctrl_m.itemsMenu 

    });// NavigationController


})(window.angular);