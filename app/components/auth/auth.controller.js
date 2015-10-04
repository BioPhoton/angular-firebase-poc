(function() {
    'use strict';


angular
    .module('discere.auth.controller', ['discere.constant', 'firebase', 'angupoly'])
    .controller('AuthController', AuthController);

	AuthController.$inject = ['AppConstant', '$firebaseAuth'];

	/** @ngInject */ 
	function AuthController(AppConstant, $firebaseAuth)
	{
		var ref = new Firebase(AppConstant.firebase_instance);

		// jshint validthis: true 
		var vm = this;

		var ref = new Firebase(AppConstant.firebase_instance);
		vm.authObj = $firebaseAuth(ref);



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


		vm.loginData2 = {
			email : 'test@email.at',
			password : 'asfasfds'
		};
		vm.doLogin2 = doLogin2;

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

				console.log(vm.registerData);

				vm.authObj
					.$createUser(vm.registerData)
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

				vm.authObj
					.$authWithPassword(vm.loginData)
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
		 *
		 * doLogin2
		 *
		 * If form is valid it try to login a firebase user
		 *
		 * @param {ngForm} loginForm
		 *
		 **/
		function doLogin2(loginForm2){

			console.log(loginForm2);

			if(loginForm2.$valid) {

				console.log(vm.loginData2);

				vm.authObj
					.$authWithPassword(vm.loginData2)
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

			vm.authObj.$unauth();

			vm.authObj.$onAuth(function(authData) {

				if (authData) {
					vm.authState = authData;
				} else {
					vm.authState = authData;
				}
			});

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

			var authData = vm.authObj.$getAuth();

			if (authData) {
				vm.authState = authData;
			} else {
				vm.authState = 'User is not authenticated => guest'
			}




		};

	};
	
	

})();
