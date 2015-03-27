'use strict';

angular.module('courses')

.factory('Lessons', ['$resource',
    function($resource) {
        return $resource('course/:courseId/:lessonId', {
            courseId: 'courseId',
            lessonId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);