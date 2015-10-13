;(function() {
    'use strict';


    angular
        .module('discere.auth.service', ['discere.constant', 'firebase'])
        .factory('UserService', UserService);

    UserService.$inject = ['$firebaseObject'];

    /** @ngInject */
    function UserService($firebaseObject) {

        // create a new service based on $firebaseObject
        var User = $firebaseObject.$extend({
            // these methods exist on the prototype, so we can access the data using `this`
            getFullName: function () {
                return this.firstName + " " + this.lastName;
            }
        });

        return function (userId) {
            var ref = new Firebase(discere.constant.firebase_instance).child(userId);
            // create an instance of User (the new operator is required)
            return new User(ref);
        }
    }
}());