'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Messages', ['$resource',
    function($resource) {
        return $resource('messages/:messageId', {
            messageId: '@_id'
        }, {
            'update': {
                method: 'PUT'
            }
        });
    }
]);