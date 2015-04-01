'use strict';

angular.module('users').controller('DashboardController', ['$scope', '$http', '$location', 'Users', 'Authentication', 'Courses',
    function($scope, $http, $location, Users, Authentication, Courses) {
        $scope.authentication = Authentication;

        // Debug info for Chrome Dev Tools inspect the scope using MY_SCOPE!
        window.MY_SCOPE = $scope;

        // If user is not signed in then redirect back home
        if (!Authentication.user) $location.path('/');

        $scope.courses = [];

        $scope.grabUsersCourses = function() {
            for (var i = 0; i < Authentication.user.coursesPurchased.length; i++) {
                this.courses.push(
                    Courses.get({
                        courseId: Authentication.user.coursesPurchased[i].courseId
                    })
                );
            };
        };
		
		$scope.viewLesson = function(){
			$location.path('/courses');
		};
    }
]);