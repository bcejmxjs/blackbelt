'use strict';

//Setting up route
angular.module('courses').config(['$stateProvider',
	function($stateProvider) {
		// Courses state routing
		$stateProvider.
		state('lecture', {
			url: '/lecture',
			templateUrl: 'modules/courses/views/lecture.client.view.html'
		}).
		state('course-list', {
			url: '/courses',
			templateUrl: 'modules/courses/views/course-list.client.view.html'
		});
	}
]);