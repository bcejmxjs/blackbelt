'use strict';

angular.module('courses').controller('LessonController', ['$scope', '$sce', '$stateParams', '$modal', '$state', '$location', 'Authentication', 'Users', 'Lessons', 'Courses', 'Submissions',
    function($scope, $sce, $stateParams, $modal, $state, $location, Authentication, Users, Lessons, Courses, Submissions) {
        window.MY_SCOPE = $scope;

        $scope.authentication = Authentication;

        $scope.pending = true;

        $scope.checkPending = function() {
            $scope.pending = false;
            Authentication.user.coursesPurchased.forEach(function(course, index, courses) {
                if (course.lessonPending == $stateParams.lessonId) {
                    $scope.pending = true;
                }
            });
            $scope.lessonsCompleted.forEach(function(lesson) {
                if (lesson == $stateParams.lessonId) {
                    $scope.pending = true;
                }
            });
        };

        $scope.findOne = function() {
            Lessons.get({
                lessonId: $stateParams.lessonId
            }, function(response) {
                $scope.lesson = response;

                if (Authentication.user.roles.indexOf('admin') < 0) {
                    if (Authentication.user.coursesPurchased) {
                        for (var i = 0; i < Authentication.user.coursesPurchased.length; i++) {
                            if (Authentication.user.coursesPurchased[i].courseId == $scope.lesson.courseId) {
                                $scope.lessonsCompleted = Authentication.user.coursesPurchased[i].lessonsCompleted;
                            }
                        }
                        if ($scope.lesson.position > $scope.lessonsCompleted.length + 1) {
                            $location.path('error/lesson');
                        }
                    }
                }

                // Configuration for video container.
                $scope.config = {
                    sources: [{
                        src: $sce.trustAsResourceUrl("videos/" + $scope.lesson.uri),
                        type: "video/mp4"
                    }],
                    tracks: [{
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English",
                        default: ""
                    }],
                    theme: "lib/videogular-themes-default/videogular.css",
                    plugins: {},
                    responsive: true,
                    height: 380,
                    width: 740
                };

                $scope.checkPending();

            }, function(error) {
                $location.path('/error/lesson');
            });

            Courses.get({
                courseId: $stateParams.courseId
            }, function(response) {
                $scope.lesson.course = response;
            }, function(error) {
                $location.path('/error/lesson');
            });
        };

        $scope.create = function() {
            this.url = this.url.replace('watch?v=', 'embed/');
            this.url = this.url.replace('youtu.be/', 'www.youtube.com/embed/');
            this.url = this.url.replace('/youtube', '/www.youtube');

            var submission = new Submissions({
                userId: Authentication.user._id,
                userDisplayName: Authentication.user.displayName,
                instructorId: '',
                lessonId: this.lesson._id,
                lessonName: this.lesson.name,
                courseId: this.lesson.courseId,
                courseName: this.lesson.course.name,
                url: this.url,
                created: new Date(),
                reviewed: false
            });

            submission.$save(function(response) {
                Authentication.user.coursesPurchased.forEach(function(course, index, courses) {
                    if (course.courseId == $stateParams.courseId) {
                        courses[index].lessonPending = $stateParams.lessonId;
                    }
                });

                var user = new Users(Authentication.user);

                user.$update(function(res) {
                    $location.path('course/' + $stateParams.courseId);
                });

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        // Open a modal window to Remove a single lesson record
        $scope.modalUserUpload = function(size, selectedLesson) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/lesson-user-upload.client.view.html',
                controller: ModalUserUploadCtrl,
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
                // $log.info('Modal dismissed at: ' + new Date());
            });

        };

        var ModalUserUploadCtrl = function($scope, $modalInstance, lesson) {
            $scope.lesson = lesson;

            $scope.ok = function() {
                $modalInstance.close($scope.lesson);
                $state.reload();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };
    }
]);