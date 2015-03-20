'use strict';

//Courses service used to communicate Courses REST endpoints
angular.module('courses')

	.factory('Courses', ['$resource',
		function($resource) {
			return $resource('courses/:courseId', { courseId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});
		}
	])


	.factory('Notify', ['$rootScope', function($rootScope) {
			
			var notify = {};

			// notify.sendMsg = function(msg, data) {
			//	data = data || {};
				notify.sendMsg = function(msg) {
				$rootScope.$emit(msg);

				console.log("message sent!");
			 };

	// // for updating delete information

			notify.getMsg = function(msg, func, scope) {
				var unbind = $rootScope.$on(msg, func);

				if (scope) {
					scope.$on('destroy', unbind);
				}
			};

			return notify;
		}
	])
;