'use strict';

angular.module('courses').controller('LessonListController', ['$scope',
    function($scope) {
        // Lesson list controller logic
        // ...
    }
]);

angular.module('courses').controller('LessonListCreateController', ['$scope', 'LessonList', '$location',
    function($scope, LessonList, $location) {

        // Create new Lesson
        this.create = function() {
            // Create new Lesson object
            var lesson = new LessonList({
                name: this.name,
                description: this.description,
                price: this.price,
                level: this.level,
                instructor: this.instructor,
                demo: this.demo
            });

            // Redirect after save
            lesson.$save(function(response) {
                $location.path('courses');

                // Clear form fields
                $scope.name = '';
                $scope.description = '';
                $scope.level = '';
                $scope.instructor = '';
                $scope.demo = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);

angular.module('courses').controller('LessonListEditController', ['$scope', 'LessonList',
    function($scope, LessonList) {
        // Edit existing Course
        this.update = function(updatedLessson) {
            var lesson = updatedLesson;

            lesson.$update(function() {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);

angular.module('courses').controller('LessonListRemoveController', ['$scope', 'LessonList', '$location', 'Notify',
    function($scope, LessonList, $location, Notify) {
        // Remove existing Course
        this.remove = function(lesson) {

            Notify.sendMsg('Oldcourse', {
                'id': lesson._id
            });

            if (lesson) {
                lesson.$remove();

                for (var i in $scope.lesson - list) {
                    if ($scope.lesson - list[i] === lesson) {
                        $scope.lesson - list.splice(i, 1);
                    }
                }
            } else {
                lesson.$remove(function() {
                    $location.path('lessons');
                });
            }
        };
    }
]);