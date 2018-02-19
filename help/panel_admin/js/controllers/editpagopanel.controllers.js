var app=angular.module("myAppPanel");

  app.controller("ModifyPago", ModifyPago);
  ModifyPago.$inject = ["$scope", "$sce", "$state", "$stateParams","$window","$uibModal", "$document",
  "buscardataFactory", "modifydataFactory", "formFactory"];

          //Controller
          function ModifyPago($scope, $sce, $state,  $stateParams,  $window,
           $uibModal, $document, buscardataFactory, modifydataFactory, formFactory) {
                                         
                 var self=this;
                 self.objData={};
                 self.data_edit={};
                 self.setNum_Pago;
                 self.allow_disable;
                 self.allow_visible=formFactory.sendEdit();
               

                 // For Modal
                 self.itemsModals=[];
                 self.itemWarning=[];
                 self.animationsEnabled=true;
              
                 self.GoUrl = GoUrl;
                 self.EditPago = EditPago;
                 self.Init = Init;
            

          //------------------------------------------------------------------------------------------------// 
            function Init () { 
                self.allow_disable=false;                   
                self.objData=modifydataFactory.searchDataEdit();
                self.objData.Pago_Realizado==='No Acreditado'?self.setNum_Pago=-2:self.setNum_Pago=-1;

                //console.log(self.objData);
                // To Set Combo
                self.data_edit={
                    availableOptions:[{id: '-2', Tipo_Pago: 'No Acreditado'}, 
                    {id: '-1', Tipo_Pago: 'Acreditado'}],
                    selectedOption: {id:self.setNum_Pago,  Tipo_Pago: self.objData.Pago_Realizado},

                }
          };    
          
        // Esto es Para el Combo   
        //-------------------------------------------------------------------------------------------------  
        $scope.upDate= function () { 
           
          
          self.data_edit.selectedOption.Tipo_Pago===self.objData.Pago_Realizado? 
          self.allow_disable=false:self.allow_disable=false;
          
            // To Validate Combos
        }// $scope.upDate= function (obj) 

    
      //***************************************************************************************************//
      // For The Modal
      self.open = function (_objtemplate) {
        console.log(_objtemplate);
        var size ="lg";
        var parentSelector=".modal-parent";
        console.log(parentSelector);
        var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-use ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: self.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: _objtemplate,
          controller: 'ModalInstanceCtrl',
          controllerAs: '$ctrl',
          size: size,
          appendTo: parentElem,
          resolve: {
            items: function () {
              return self.itemsModals;
            },
            itemWarning: function () {
              return self.itemWarning;
            }
          }
        });

        modalInstance.result.then(function () {
          $state.go('myAppPanel.main');
        }, function () {
          $state.go('myAppPanel.main');
        });
      };
    //***************************************************************************************************//     
            function EditPago() {     
                               
                  angular.isDefined(self.objData.Pago_Realizado)?setChange():self.allow_disable=true;


                  function setChange () {
                    self.objData.Pago=self.data_edit.selectedOption.id;
                    self.allow_disable=true;
                    self.objData.type_accion="modify_pago";          
                    modifydataFactory.modifyPago(self.objData).then(function(d) {    
                      self.open("templates/modal/warningchangepay.html");
                   });
              }  
                
          };

    //---------------------------------------------------------------------------------------------------// 
          function GoUrl () {
                 $state.go('myAppPanel.main');
          };


          Init();
         


     }// DataSendController

/**********************************************/
// FOR TABLE