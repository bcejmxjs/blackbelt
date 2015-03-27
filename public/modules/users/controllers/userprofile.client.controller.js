'use strict';

angular.module('users').controller('UserprofileController', ['$scope', '$http', '$location', 'Users', 'Authentication', 'Courses',
    function($scope, $http, $location, Users, Authentication, Courses) {
        $scope.authentication = Authentication;

        // If user is not signed in then redirect back home
        if (!Authentication.user) $location.path('/');

        $scope.courses = [];

        var grabUsersCourses = function() {
            for (var i = 0; i < Authentication.user.purchased.length; i++) {
                this.courses.push(
                    Courses.get({
                        courseId: Authentication.user.purchased[i].courseId
                    })
                );
            };
        };
    }
]);