;(function() {
    'use strict';

    angular
        .module('discere.auth.service', ['discere.constant', 'firebase'])
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$q','AppConstant', '$firebaseAuth'];

    /** @ngInject */
    function AuthService($q, AppConstant, $firebaseAuth)
    {
        var ref = new Firebase(AppConstant.firebase_instance),
            authObj = $firebaseAuth(ref);

        var authService = {
            register : register,
            login : login,
            logout : logout
        };

        ref.onAuth(function(authData) {
            //console.log(authData);
        });

        return authService;

        //////////////////////////////////////

        /**
         *
         * register
         *
         * If form is valid it try to create a firebase user
         *
         * @param {Object} registerData
         *
         **/
        function register(registerData, doWithLogin){

            var promise = authObj.$createUser(registerData);

            if(doWithLogin) {

                return promise
                    .then(
                        //register success
                        function(success) {
                            // returns the promise of the services login function
                           return login(registerData)
                        }
                    )
                    .then(
                        //login success
                        function(authData) {
                            // returns the promise of the internal setInitialUserData function
                            return setInitialUserData(authData);
                        }
                    )
                    .catch(function(error) {
                        //returnes a rejected Promise
                        //this catches all errors of the chained promises
                        return $q.reject(error);
                    });

            }

            return promise;

            ///////////

            function setInitialUserData(authData) {
                var defer = $q.defer();

                ref.child("users").child(authData.uid).once("value", function(snapshot) {

                    if(!snapshot.exists()){
                        ref.child("users").child(authData.uid).set({
                            provider: authData.provider,
                            name: authData.uid
                        });
                    }

                    defer.resolve(authData);
                });

                return defer.promise;
            };
        }

        /**
         *
         * login
         *
         * If form is valid it try to login a firebase user
         *
         *  @param {Object} loginData The login data
         *                  - email {String} The users Email
         *                  - password {String} The users unencrypted password
         *
         **/
        function login(loginData){
              return authObj.$authWithPassword(loginData);
        };


        /**
         * logout
         *
         *
         */
        function logout() {
            authObj.$unauth();
        }

        /**
         *
         * getAuth
         *
         * Returns current auth state of user
         *
         **/
        function getAuth(){
            return authObj.$getAuth();
        };

    };



})();
