'use strict';

angular.module('users').controller('UserprofileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
    function($scope, $http, $location, Users, Authentication) {
        $scope.authentication = Authentication;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

    }
]);