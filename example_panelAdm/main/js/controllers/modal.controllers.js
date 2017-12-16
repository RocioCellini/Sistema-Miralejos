var app=angular.module("myAppPanel");
app.controller("ModalInstanceCtrl", ModalInstanceCtrl);
ModalInstanceCtrl.$inject = ["$uibModalInstance", "items", "itemWarning"];

function ModalInstanceCtrl($uibModalInstance, items, itemWarning) {

      var $ctrl = this;
      $ctrl.Message="";

      $ctrl.selectedModal = {
        type1:1,
        type2:0
      };

      $ctrl.ModalButtons = {
        typeb1:false,
        typeb2:false
      };


      $ctrl.itemWarning = itemWarning;
      $ctrl.items = items;
      

      $ctrl.selected = {
      };


      $ctrl.ok = function () {
        $uibModalInstance.close();
	   };// 
};// 
