(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: '/templates/home.html',
      controller: 'HomeController as vm'
		}).state('CreateBear', {
			url: '/Bear/Create',
			templateUrl: '/templates/create_bear.html',
			controller: 'CreateBearController as vm'
		}).state('EditBear', {
			url: '/Bear/Edit/:id',
			templateUrl: '/templates/edit_bear.html',
			controller: 'EditBearController as vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
