'use strict';

angular.module('calendar').controller('CalendarController', ['$scope',
	function($scope) {
		// Calendar controller logic
		// ...
        $scope.day = moment();
	}
]);
