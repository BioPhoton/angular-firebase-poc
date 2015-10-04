(function() {
    'use strict';

	angular
	    .module('discere.controller', [])
	    .controller('AppController', AppController);
	
	AppController.$inject = ['$scope'];
	
	/** @ngInject */
	function AppController($scope) {
		/* jshint validthis: true */
		var vm = this;
		
		vm.navCollapsed = true;

	};



})();
