'use strict';

//Setting up route
angular.module('calendar').config(['$stateProvider',
	function($stateProvider) {
		// Calendar state routing
		$stateProvider.
		state('calendar', {
			url: '/calendar',
			templateUrl: 'modules/calendar/views/calendar.client.view.html'
		});
	}
]);