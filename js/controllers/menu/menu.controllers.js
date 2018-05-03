(function (_angular) {

          var app=_angular.module("GestionVentas");

          app.controller('NavigationController', function( $scope, $state ) {

          var $ctrl = this;

          $ctrl.allow_visible=true;
              
           $scope.$watch( function()  {
                  return $state.$current.name
            }, function( newVal, oldVal )  {
              
             newVal==='GestionVentas.index'? $ctrl.allow_visible=false: $ctrl.allow_visible=true;             
            
          }); 

          $ctrl.itemsMenu = [/*{
            name: "Estadisticas",
            link: "#",
            subtree: [{
              name: "Ver Estadisticas",
              link: "GestionVentas.estadisticas",
            }]
          },*/ {
            name: "Planilla",
            link: "#",
            subtree: [{
              name: "Visualizar",
              link: "GestionVentas.planilla"
            },{
              name: "Agregar Fila",
              link: "GestionVentas.agregarDatos"
            },{
              name: "Importar Planilla",
              link: "GestionVentas.importar"
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
            name: "Inmobiliarias",
            link: "#",
             subtree: [{
              name: "Buscar",
              link: "GestionVentas.buscarInmob"
            },
            {
              name: "Añadir",
              link: "GestionVentas.nuevaInmob"
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
            name: "Actividad",
            link: "#",
            subtree: [{
              name: "Buscar",
              link: "GestionVentas.buscarAct"
            },
            {
              name: "Añadir",
              link: "GestionVentas.nuevaAct"
            }]
          },{
            name: "Origen del Dato",
            link: "#",
            subtree: [{
              name: "Buscar",
              link: "GestionVentas.buscarOrigen"
            },
            {
              name: "Añadir",
              link: "GestionVentas.nuevoOrigen"
            }]
          },
          {
            name: "Salir",
            link: "#",
            subtree: [{
              name: "Cerrar Sesion",
              link: "GestionVentas.logOut"
            }]
          }


          ]// $ctrl.itemsMenu 

    });// NavigationController


})(window.angular);