'use strict';

angular.module('courses')

.factory('CourseLessons', ['$resource',
    function($resource) {
        return $resource('courses/:courseId/lessons', {
            courseId: 'courseId'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
])

.factory('Lessons', ['$resource',
    function($resource) {
        return $resource('lessons/:lessonId', {
            lessonId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);