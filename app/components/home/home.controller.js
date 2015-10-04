;(function() {
    'use strict';


angular
    .module('discere.home.controller', ['firebase', 'discere.constant'])
    .controller('HomeController', HomeController);

	HomeController.$inject = ['AppConstant', '$firebaseObject', '$firebaseArray'];

	/** @ngInject */ 
	function HomeController(AppConstant, $firebaseObject, $firebaseArray )
	{ 
		// jshint validthis: true 
		var vm = this;



		var ref = new Firebase(AppConstant.firebase_instance);

		// create a synchronized array
		this.data = $firebaseArray(ref);


		///////////////////////
	    
		//_____________________________________________________________________________________________________________________________________________
		
	};

})();
