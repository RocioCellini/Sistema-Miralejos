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
              name: "A�adir",
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
              name: "A�adir",
              link: "GestionVentas.nuevoVendedor"
            }]
          },{
            name: "Relaci�n EPD",
            link: "#",
            subtree: [{
              name: "Edificios",
              link: "GestionVentas.edificios",
              subtree: [{
                          name: "Buscar",
                          link: "GestionVentas.buscarEdificio"
                        },
                        {
                          name: "A�adir",
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
                          name: "A�adir",
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
                          name: "A�adir",
                          link: "GestionVentas.nuevoDpto"
                        }]
              },{
              name: "A�adir Relaci�n",
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
              name: "A�adir",
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
              name: "A�adir",
              link: "GestionVentas.nuevoLlamado"
            }]
          },{
            name: "Cierre de Operaci�n",
            link: "#",
            subtree: [{
              name: "Cerrar Operaci�n",
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
              name: "A�adir",
              link: "GestionVentas.nuevaActividad"
            }]
          }


          ]// $ctrl_m.itemsMenu 

    });// NavigationController


})(window.angular);