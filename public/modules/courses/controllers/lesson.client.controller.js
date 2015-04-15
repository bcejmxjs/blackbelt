'use strict';

angular.module('courses').controller('LessonController', ['$scope', '$sce', '$stateParams', '$modal', '$state', '$location', 'Authentication', 'Lessons', 'Submissions',
    function($scope, $sce, $stateParams, $modal, $state, $location, Authentication, Lessons, Submissions) {
        window.MY_SCOPE = $scope;

        $scope.authentication = Authentication;

        $scope.findOne = function() {
            Lessons.get({
                lessonId: $stateParams.lessonId
            }, function(response) {
                $scope.lesson = response;

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
            }, function(error) {
                $location.path('/error/lesson');
            });
        };

        $scope.create = function() {
            this.url = this.url.replace('watch?v=', 'embed/');
            this.url = this.url.replace('.be/', 'be.com/embed/');

            var submission = new Submissions({
                userId: Authentication.user._id,
                userDisplayName: Authentication.user.displayName,
                instructorId: 'kfajsklfjsdkljfklsdajfkljsad',
                lessonId: this.lesson._id,
                courseId: this.lesson.courseId,
                url: this.url,
                created: new Date(),
                reviewed: false
            });

            submission.$save(function(response) {
                // $location.path('course/' + +$stateParams.courseId);

                // Clear form fields
                this.url = '';
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