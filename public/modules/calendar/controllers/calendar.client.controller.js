'use strict';

angular.module('calendar').controller('CalendarController', ['$scope', 'Events',
    function($scope, Events) {
		// Calendar controller logic
		// ...
        
        $scope.day = moment();

        $scope.list = function() {
            $scope.events = Events.query();
        };
	}
]);
