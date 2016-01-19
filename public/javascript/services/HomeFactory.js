(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q) {
		var o = {};

		o.getAllBears = function() {
			var q = $q.defer();
			$http.get('/bears').then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.getBearById = function(id) {
			var q = $q.defer();
			$http.get('/bears/' + id).then(function(res) {
				q.resolve(res.data);
			}, function(err) {
				q.reject();
			});
			return q.promise;
		};

		o.createBear = function(bear) {
			var q = $q.defer();
			$http.post('/bears', bear).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.editBear = function(bear) {
			var q = $q.defer();
			$http.put('/bears/' + bear._id, bear).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		o.deleteBear = function(id) {
			var q = $q.defer();
			$http.delete('/bears/' + id).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		return o;
	}
})();
