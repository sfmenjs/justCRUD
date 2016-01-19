(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(HomeFactory) {
		var vm = this;

		HomeFactory.getAllBears().then(function(res) {
			vm.bears = res;
		});

		vm.deleteBear = function(bear) {
			HomeFactory.deleteBear(bear._id).then(function() {
				vm.bears.splice(vm.bears.indexOf(bear), 1);
			});
		}
	}
})();
