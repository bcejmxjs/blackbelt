'use strict';

angular.module('courses').controller('LessonListController', ['$scope', '$stateParams', 'Authentication', 'Courses', 'Lessons', '$modal', '$log', '$sce', '$location', '$state',

    function($scope, $stateParams, Authentication, Courses, Lessons, $modal, $log, $sce, $location, $state) {

        window.MY_SCOPE = $scope;

        this.authentication = Authentication;

        //Will if the lesson is completed
        /*$scope.isCurrentlyDone = function() {
            var done;
            if ()
                return true;
            else
                return false;
        };

        //Gets correct panel style to associate with being done.
        $scope.getDonePanelClass = function() {
            if ()
                return 'panel-success';
            else
                return 'panel-default';

        };

        //Gets correct panel TEXT to associate with being done.
        $scope.getDonePanelText = function() {
            if ($scope.isCurrentlyDone())
                return 'Done';
            else
                return ;
        };*/

        this.list = function() {
            $scope.lessons = Lessons.query({
                courseId: $stateParams.courseId
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

        this.findOne = function() {
            $scope.lesson = Lessons.get({
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
                $state.reload();
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

        $scope.lessonsCompleted = [];

        $scope.grabLessonsCompleted = function() {
            // Get the lessons completed for this particular course.

            //Step 1: Find This Course in Courses Purchased
            if ( Authentication.user.coursesPurchased ) {
                for (var i = 0; i < Authentication.user.coursesPurchased.length; i++) {
                    if (Authentication.user.coursesPurchased[i].courseId == $scope.course._id ) {
                        $scope.lessonsCompleted = Authentication.user.coursesPurchased[i].lessonsCompleted;
                    }
                }
            }
        };

        /* ======= Begin Style Functions For Lessons ======= */

        //returns true/false depending on if lesson is complete.
        this.isLessonComplete = function( lesson ) {
            for( var a = 0; a != $scope.lessonsCompleted.length; a++ ) {
                if( $scope.lessonsCompleted[a] == lesson._id )
                    return true;
            }
            return false;
        };

        //changes the background color on the object depending on whether it has been completed or not.
        this.getBackgroundColor = function( lesson ) {
            if ( this.isLessonComplete( lesson ) ) {
                return { 'background-color' : '#DFF0D8' }; //that nice green success!
            }
            else {
                return { 'background-color' : '#E8E8E8' }; //returns a greyish color
            }
        };

    }

]);

angular.module('courses').controller('LessonListCreateController', ['$scope', '$stateParams', 'Courses', 'Lessons', '$location',
    function($scope, $stateParams, Courses, Lessons, $location) {

        window.MY_SCOPE = this;
        this.courseId = $stateParams.courseId;
        //useful for getting name of course
        this.course = Courses.get({ courseId: this.courseId });

        // Create new Lesson
        this.create = function() {
            // Create new Lesson object
            var lesson = new Lessons({
                name: this.name,
                description: this.description,
                uri: 'big_buck_bunny.mp4',
                position: this.position,
                courseId: $stateParams.courseId
            });

            // Redirect after save
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

angular.module('courses').controller('LessonListRemoveController', ['$scope', 'Courses', 'Lessons', '$location', 'Notify', '$stateParams',
    function($scope, Lessons, $location, Notify, $stateParams) {
        // Remove existing Lesson
        this.remove = function(lesson) {

            if (lesson) {
                lesson.$remove();

            } else {
                lesson.$remove(function() {
                    $location.path('course/' + lesson.courseId);
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