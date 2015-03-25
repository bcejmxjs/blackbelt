'use strict';

//Setting up route
angular.module('courses').config(['$stateProvider', '$sceDelegateProvider',
    function($stateProvider, $sceDelegateProvider) {
        // Courses state routing
        $stateProvider.
        state('lesson-list', {
            url: '/lesson-list',
            templateUrl: 'modules/courses/views/lesson-list.client.view.html'
        }).
        state('listCourses', {
            url: '/courses',
            templateUrl: 'modules/courses/views/course-list.client.view.html'
        }).
        state('createCourse', {
            url: '/courses/create',
            templateUrl: 'modules/courses/views/course-create.client.view.html'
        }).
        state('viewCourse', {
            url: '/courses/:courseId',
            templateUrl: 'modules/courses/views/course-view.client.view.html'
        }).
        state('editCourse', {
            url: '/courses/:courseId/edit',
            templateUrl: 'modules/courses/views/course-edit.client.view.html'
        }).
        state('RemoveCourse', {
            url: '/courses/:courseId/remove',
            templateUrl: 'modules/courses/views/course-remove.client.view.html'
        }).
        state('Lesson', {
            url: '/lesson',
            templateUrl: 'modules/courses/views/lesson.client.view.html'
        });

        $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
    }
]);