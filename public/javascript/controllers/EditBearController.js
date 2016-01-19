(function() {
  "use strict";
  angular.module('app').controller('EditBearController', EditBearController);
  function EditBearController($state, $stateParams, HomeFactory) {
      var vm = this;

      if(!$stateParams.id) $state.go('Home');
      HomeFactory.getBearById($stateParams.id).then(function(res) {
        vm.bear = res;
      }, function() {
        $state.go('Home');
      });

      vm.editBear = function() {
        HomeFactory.editBear(vm.bear).then(function() {
          $state.go('Home');
        });
      };
  }
})();
