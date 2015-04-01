'use strict';

angular.module('courses')

.factory('CourseLessons', ['$resource',
    function($resource) {
        return $resource('courses/:courseId/lessons', {
            courseId: 'courseId'
        }, {
            update: {
                method: 'PUT',
                url: 'lessons/:lessonId',
                params: {
                    lessonId: '@_id'
                }
            },
            get: {
                method: 'GET',
                url: 'lessons/:lessonId',
                params: {
                    lessonId: '@_id'
                }
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