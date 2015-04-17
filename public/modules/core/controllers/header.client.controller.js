'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus',
    function($scope, $state, Authentication, Menus) {
        window.MENU_SCOPE = $scope;
        $scope.authentication = Authentication;
        $scope.state = $state;
        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');

        $(function() {
            $.material.init();

        });

        $scope.toggleCollapsibleMenu = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });
    }
]);