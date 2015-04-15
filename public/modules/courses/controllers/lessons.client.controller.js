'use strict';

angular.module('courses').controller('LessonsController', ['$scope', '$upload', '$stateParams', 'Authentication', 'Courses', 'Lessons', '$modal', '$log', '$sce', '$location', '$state',
    function($scope, $upload, $stateParams, Authentication, Courses, Lessons, $modal, $log, $sce, $location, $state) {

        window.MY_SCOPE = $scope;

        $scope.authentication = Authentication;

        // Current course, for returning back during lesson creation.
        $scope.courseParam = $stateParams.courseId;

        $scope.list = function() {
            Lessons.query({
                courseId: $stateParams.courseId
            }, function(res) {
                $scope.lessons = res;
            }, function(error) {
                $location.path('error/course');
            });

            if ($stateParams.courseId) {
                Courses.get({
                    courseId: $stateParams.courseId
                }, function(res) {
                    $scope.course = res;
                    $scope.grabLessonsCompleted();
                }, function(error) {
                    $location.path('/error/course');
                });
            } else {
                $location.path('/error/course');
            }
        };

        $scope.findOne = function() {
            $scope.lesson = Lessons.get({
                courseId: $stateParams.courseId,
                lessonId: $stateParams.courseId
            });
        };

        // Open a modal window to update a single course record
        $scope.modalUpdate = function(size, selectedLesson) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/lesson-edit.client.view.html',
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
        $scope.modalRemove = function(size, selectedLesson) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/lesson-remove.client.view.html',
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
                $state.reload();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        // Open a modal window to View a single course record
        $scope.modalView = function(size, selectedCourse) {

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

        $scope.lessonsCompleted = [];

        $scope.grabLessonsCompleted = function() {
            // Get the lessons completed for $scope particular course.

            $scope.lessonsCompleted = [];
            //Step 1: Find $scope Course in Courses Purchased
            if (Authentication.user.coursesPurchased) {
                for (var i = 0; i < Authentication.user.coursesPurchased.length; i++) {
                    if (Authentication.user.coursesPurchased[i].courseId == $scope.course._id) {
                        $scope.lessonsCompleted = Authentication.user.coursesPurchased[i].lessonsCompleted;
                    }
                }
            }
        };

        $scope.viewLesson = function(lesson) {
            if (Authentication.user.roles.indexOf('admin') > -1) {
                $location.path('course/' + $stateParams.courseId + '/' + lesson._id);
            } else if (lesson.position <= ($scope.lessonsCompleted.length + 1)) {
                $location.path('course/' + $stateParams.courseId + '/' + lesson._id);
            } else {
                $scope.error = 'You aren\'t able to view ' + lesson.name + ' yet!';
            }
        };

        /* ======= Begin Style Functions For Lessons ======= */

        //returns true/false depending on if lesson is complete.
        $scope.isLessonComplete = function(lesson) {
            for (var a = 0; a != $scope.lessonsCompleted.length; a++) {
                if ($scope.lessonsCompleted[a] == lesson._id)
                    return true;
            }
            return false;
        };

        //changes the background color on the object depending on whether it has been completed or not.
        $scope.getBackgroundColor = function(lesson) {
            if ($scope.isLessonComplete(lesson)) {
                return {
                    'background-color': '#DFF0D8'
                }; //that nice green success!
            } else {
                return {
                    'background-color': '#F5F5F5'
                }; //returns a greyish color
            }
        };

        // Create new Lesson
        $scope.create = function() {
            // Create new Lesson object
            var lesson = new Lessons({
                name: this.name,
                description: this.description,
                position: this.position,
                courseId: $stateParams.courseId
            });

            if (this.files && this.name && this.description) {
                $upload.upload({
                    url: 'videos',
                    method: 'POST',
                    fields: {
                        'courseId': $stateParams.courseId,
                        'lessonName': this.name
                    },
                    file: this.files[0]
                }).progress(function(evt) {
                    $scope.showProgressBar = true;
                    $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    // Redirect after save
                    lesson.uri = data.filename;
                    lesson.$save(function(response) {
                        $location.path('course/' + $stateParams.courseId);

                        // Clear form fields
                        $scope.name = '';
                        $scope.description = '';
                        $scope.uri = '';
                        $scope.position = '';
                        $scope.courseId = '';
                    }, function(errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                });
            } else {
                $scope.error = "Please fill out all fields!";
            }
        };

        // Edit existing Course
        $scope.update = function(updatedLesson) {
            var lesson = updatedLesson;

            lesson.$update(function() {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Lesson
        $scope.remove = function(lesson) {

            if (lesson) {
                lesson.$remove();

            } else {
                lesson.$remove(function() {
                    $location.path('course/' + lesson.courseId);
                });
            }
        };

        // View existing Course
        $scope.findOne = function() {
            $scope.lesson = Courses.get({
                courseId: $stateParams.courseId
            });
        };
    }
]);