;(function() {
    'use strict';

    /**
     *  Constants for FirebaseConstant
     *
     */
    var FirebaseConstant =  {

        //https://www.firebase.com/docs/web/guide/user-auth.html#section-full-error
        validation : {
            EMAIL_TAKEN : 'email-taken'
        }
    };

    /**
     * FirebaseConstant Modules
     */
    angular
        .module('discere.commons.firebase.constant', [])
        .constant("FirebaseConstant", FirebaseConstant);

})();