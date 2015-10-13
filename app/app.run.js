;(function() {
	'use strict';


	angular
		.module('discere.run', ['ui.router','firebase'])
		.run(runFunction);

	runFunction.$inject['$rootScope', '$urlRouter' ];

	/** @ngInject */
	function runFunction($rootScope,  $urlRouter) {

			var authObj = $firebaseAuth(ref);

			//http://angular-ui.github.io/ui-router/site/#/api/ui.router.router.$urlRouterProvider#methods_deferintercept
			$rootScope.$on('$locationChangeSuccess', function (e) {

				if (true) {
					//nothing to do sync the current URL to the router
					$urlRouter.sync();
					return;
				}

				// Prevent $urlRouter's default handler from firing
				e.preventDefault();

				// init or refresh Authentication service connection
				authObj.$waitForAuth().then(
					function () {
						console.log('sssss');
						//sync the current URL to the router
						$urlRouter.sync();
					},
					function () {
						console.log('eeeee');
						//sync the current URL to the router
						$urlRouter.sync();
					}
				);

				// Configures $urlRouter's listener *after* your custom listener
				$urlRouter.listen();
			});


		};

})();



