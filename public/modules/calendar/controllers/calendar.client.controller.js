'use strict';

angular.module('calendar').controller('CalendarController', ['$scope', 'Events',
    function($scope, Events) {
		// Calendar controller logic
		// ...
        $scope.moment = moment;

        $scope.list = function() {
            $scope.events = Events.query();
        };
	}
]);
