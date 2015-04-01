'use strict';

angular.module('courses')

.factory('Lessons', ['$resource',
    function($resource) {
        return $resource('courses/lessons/:courseId', {
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
            },
            remove: {
                method: 'DELETE',
                url: 'lessons/:lessonId',
                params: {
                    lessonId: '@_id'
                }
            },
            getAll: {
                method: 'GET',
                url: 'lessons',
                isArray: true
            }
        });
    }
]);