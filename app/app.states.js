;(function() {
    'use strict';

angular
    .module('discere.states', ['ui.router',  'discere.controller',
                                           'discere.home.controller'
		/*  'discere.auth.controller'*/
											])
    .config(configFunction);

	configFunction.$inject = ['$stateProvider', '$urlRouterProvider'];

	/** @ngInject */ 
	function configFunction($stateProvider, $urlRouterProvider) 
	{ 
		
		//routing configurations
		$urlRouterProvider.otherwise('/app/home');
	    
	    $stateProvider
	
	    //holds the navigation and toggled state of menu
	    .state('app', {
            url: "/app",
            //abstract: true,
            templateUrl: "app/app.view.html",
            controller: 'AppController',
            controllerAs : 'app'
        })

	    .state('app.home', {
	        url: '/home',
	        views : {
	        	'mainNavContent' : {
	        		templateUrl: './app/components/home/home.view.html',
	    	        controller: 'HomeController',
	                controllerAs : 'home'
	        	}
	        }
	        
	    })
		/*
	    .state('app.auth', {
	        url: '/auth',
	        views : {
	        	'mainNavContent' : {
			        templateUrl: './app/components/auth/auth.view.html',
			        controller: 'AuthController',
			        controllerAs: 'auth'
	        	}
	        }
	    })
		/**/
	};

})();



