'use strict';

//Setting up route
angular.module('courses').config(['$stateProvider',
    function($stateProvider) {
        // Courses state routing
        $stateProvider.
        state('lesson', {
            url: '/lesson',
            templateUrl: 'modules/courses/views/lesson.client.view.html'
        }).
        state('course-list', {
            url: '/courses',
            templateUrl: 'modules/courses/views/course-list.client.view.html'
        });
    }
]);