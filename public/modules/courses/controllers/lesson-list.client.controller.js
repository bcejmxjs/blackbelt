'use strict';

angular.module('courses').controller('LessonListController', ['$scope', '$stateParams', 'Authentication', 'Courses', 'CourseLessons', '$modal', '$log', '$sce',

    function($scope, $stateParams, Authentication, Courses, CourseLessons, $modal, $log, $sce) {

        window.MY_SCOPE = $scope;

        this.authentication = Authentication;

        $scope.list = function() {
            $scope.lessons = CourseLessons.query({
                courseId: $stateParams.courseId
            });
            $scope.course = Courses.get({
                courseId: $stateParams.courseId
            });
        };

        this.findOne = function() {
            $scope.lesson = CourseLessons.get({
                courseId: $stateParams.courseId,
                lessonId: $stateParams.courseId
            });
        };


        // Open a modal window to Create a single course record
        this.modalCreate = function(size) {

            var modalInstance = $modal.open({
                // templateUrl: 'modules/courses/views/create-course.client.view.html',
                controller: ModalCreateCtrl,
                size: size
            });

            modalInstance.result.then(function(selectedItem) {

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };


        var ModalCreateCtrl = function($scope, $modalInstance) {

            $scope.ok = function() {
                $modalInstance.close();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        // Open a modal window to update a single course record
        this.modalUpdate = function(size, selectedLesson) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/lesson-list-edit.client.view.html',
                controller: ModalUpdateCtrl,
                size: size,
                resolve: {
                    lesson: function() {
                        return selectedLesson;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };


        var ModalUpdateCtrl = function($scope, $modalInstance, lesson) {
            $scope.lesson = lesson;

            $scope.ok = function() {
                $modalInstance.close($scope.lesson);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        // Open a modal window to Remove a single course record
        this.modalRemove = function(size, selectedLesson) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/lesson-list-remove.client.view.html',
                controller: ModalRemoveCtrl,
                size: size,
                resolve: {
                    lesson: function() {
                        return selectedLesson;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };


        var ModalRemoveCtrl = function($scope, $modalInstance, lesson) {
            $scope.lesson = lesson;

            $scope.ok = function() {
                $modalInstance.close($scope.lesson);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        // Open a modal window to View a single course record
        this.modalView = function(size, selectedCourse) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/course-view.client.view.html',
                controller: ModalViewCtrl,
                size: size,
                resolve: {
                    course: function() {
                        return selectedCourse;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };


        var ModalViewCtrl = function($scope, $modalInstance, course) {
            $scope.course = course;

            $scope.ok = function() {
                $modalInstance.close($scope.course);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

    }

]);

angular.module('courses').controller('LessonListCreateController', ['$scope', 'Courses', 'Lessons', '$location', '$stateparams',
    function($scope, Courses, Lessons, $location, $stateparams) {

        // Create new Lesson
        this.create = function() {
            // Create new Lesson object
            var lesson = new Lessons({
                name: this.name,
                description: this.description,
                uri: 'big_buck_bunny.mp4',
                position: this.position,
                courseId: $stateparams.courseId
            });

            // Redirect after save
            lesson.$save(function(response) {
                $location.path('course/' + $stateparams.courseId);

                // Clear form fields
                $scope.name = '';
                $scope.description = '';
                $scope.uri = '';
                $scope.position = '';
                $scope.courseId = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);

angular.module('courses').controller('LessonListEditController', ['$scope', 'Lessons',
    function($scope, Lessons) {
        // Edit existing Course
        this.update = function(updatedLesson) {
            var lesson = updatedLesson;

            lesson.$update(function() {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);

angular.module('courses').controller('LessonListRemoveController', ['$scope', 'Courses', 'Lessons', '$location', 'Notify',
    function($scope, Lessons, $location, Notify) {
        // Remove existing Lesson
        this.remove = function(lesson) {

            // Notify.sendMsg('Oldlesson', {
            //     'id': lesson._id
            // });

            if (lesson) {
                lesson.$remove();

                
            } else {
                lesson.$remove(function() {
                    $location.path('listLessons');
                });
            }
        };
    }
]);

angular.module('courses').controller('LessonListViewController', ['$scope', 'Courses', '$stateParams',
    function($scope, Courses, $stateParams) {
        // View existing Course

        this.findOne = function() {
            $scope.lesson = Courses.get({
                courseId: $stateParams.courseId
            });
        };
    }
]);
