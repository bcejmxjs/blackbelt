'use strict';

//Setting up route
angular.module('courses').config(['$stateProvider',
	function($stateProvider) {
		// Courses state routing
		$stateProvider.
		state('course-list', {
			url: '/courses',
			templateUrl: 'modules/courses/views/course-list.client.view.html'
		});
	}
]);