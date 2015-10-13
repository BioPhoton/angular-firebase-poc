(function() {
    'use strict';


angular
    .module('discere.auth.controller', ['discere.commons.firebase.constant', 'discere.commons.firebase.validation','discere.auth.service'])
    .controller('AuthController', AuthController);

	AuthController.$inject = ['AuthService', 'FirebaseConstant'];

	/** @ngInject */ 
	function AuthController(AuthService, FirebaseConstant)
	{
		// jshint validthis: true
		var vm = this;


		vm.registerServerError = false;
		vm.registerData = {
			email : 'test@email.at',
			password : 'asfasfds'
		};
		vm.doRegister = doRegister;

		//________________________________________

		vm.loginServerError = false;
		vm.loginData = {
			email : 'test@email.at',
			password : 'asfasfds'
		};

		vm.doLogin = doLogin;
		//________________________________________

		vm.doLogout = doLogout;

		//________________________________________


		vm.authState = undefined;
		vm.getAuth = getAuth;



		//////////////////////////////////////

		/**
		 *
		 * doRegister
		 *
		 * If form is valid it try to create a firebase user
		 *
		 * @param {ngForm} registerForm
		 *
		**/
		function doRegister(registerForm){


			if(registerForm.$valid) {

				AuthService.register(vm.registerData, true)
						.then(
							function(userData) {
								console.log("User " + userData.uid + " created successfully!");
							},
							function(error){
								console.log(error);

								if(error.details) {
									vm.registerServerError = error.details;
								} else {
									vm.registerServerError = error.message;
								}

								if(error.code == 'EMAIL_TAKEN'){
									//@TODO mark email input as invalid
									registerForm.email.$setValidity(FirebaseConstant.validation.EMAIL_TAKEN, false);

								}

							}
						);
			}
		}

		/**
		 *
		 * doLogin
		 *
		 * If form is valid it try to login a firebase user
		 *
		 * @param {ngForm} loginForm
		 *
		 **/
		function doLogin(loginForm){

			if(loginForm.$valid) {

				console.log(loginForm);

				AuthService.login(vm.loginData)
						.then(
							function(authData) {
								vm.authState = authData;
								console.log("Logged in as:", authData.uid);
							}
						)
						.catch(
							function(error) {
								console.error("Authentication failed:", error);
							}
						);

			}
		};


		/**
		 * doLogout
		 *
		 *
		 */
		function doLogout() {

			AuthService.logout();

		}

		/**
		 *
		 * getAuth
		 *
		 * If form is valid it try to login a firebase user
		 *
		 * @param {ngForm} loginForm
		 *
		 **/
		function getAuth(){

			var authData = AuthService.getAuth();

			if (authData) {
				vm.authState = authData;
			} else {
				vm.authState = 'User is not authenticated => guest'
			}




		};

	};
	
	

})();
