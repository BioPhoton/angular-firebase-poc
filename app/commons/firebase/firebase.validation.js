;(function() {
    'use strict';

    angular
        .module('discere.commons.firebase.validation', ['discere.commons.firebase.constant'])
        .directive('emailTaken', emailTaken);


    emailTaken.$inject = ['FirebaseConstant'];

    /** @ngInject */
    function emailTaken(FirebaseConstant) {

        return {
            // restrict to an attribute type.
            restrict: 'A',
            // element must have ng-model attribute.
            require: 'ngModel',
            link: function(scope, ele, attrs, ngModelCtrl){

                // add a parser that will process each time the value is
                // parsed into the model when the user updates it.
                ngModelCtrl.$parsers.unshift(function(value) {

                    /**
                     * The requests promise.then() set's validity for email-taken to false if error
                     *
                     * Example:
                     *
                     * var authObj = $firebaseAuth('firebase_instance');
                     *
                     * authObj.$createUser(registerData)
                     * .catch(function() {
                     *      if(error.code == 'EMAIL_TAKEN'){
					 *				myForm.myInputName.$setValidity(FirebaseConstant.validation.EMAIL_TAKEN, false);
					 *		}
					 *	});
                     *
                    **/

                    if(ngModelCtrl.$invalid){
                        if(value){
                            ngModelCtrl.$setValidity(FirebaseConstant.validation.EMAIL_TAKEN, true);
                        }
                    }

                    //return the value to the model,
                    return value;
                });
            }

        };


    };


})();