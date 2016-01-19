(function() {
  "use strict";
  angular.module('app').controller('CreateBearController', CreateBearController);
  function CreateBearController(HomeFactory, $state) {
      var vm = this;
      vm.bear = {};

      vm.createBear = function() {
        HomeFactory.createBear(vm.bear).then(function(res) {
          $state.go('Home');
        });
      };
  }
})();
