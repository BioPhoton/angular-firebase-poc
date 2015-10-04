;(function() {
	'use strict';

	/**
	 *  Constants for SystemResourceModules
	 *
	 *  NOTE: if you want to change this constant do this in your app.js config section
	 */
	var AppConstant =  {

		firebase_instance : 'https://amber-inferno-7583.firebaseio.com'

	};

	/**
	 * System Constant Modules
	 */
	angular
		.module('discere.constant', [])
		.constant("AppConstant", AppConstant);

})();