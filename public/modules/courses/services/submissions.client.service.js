'use strict';

//Submissions service used to communicate Submissions REST endpoints
angular.module('courses')

.factory('Submissions', ['$resource',
    function($resource) {
        return $resource('submissions/:submissionId', {
            submissionId: '@_id'
        }, {
            'update': {
                method: 'PUT'
            }
        });
    }
]);