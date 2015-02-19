'use strict';

angular.module('calendar').factory('Events', ['$resource',
	function($resource) {
		// Events service logic
		// ...
        return $resource('events/:eventId', { eventId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
