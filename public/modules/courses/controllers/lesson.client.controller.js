'use strict';

angular.module('courses').controller('LectureController', ['$scope', '$sce', '$stateParams', '$modal', '$state', 'Lessons',
    function($scope, $sce, $stateParams, $modal, $state, Lessons) {
        window.MY_SCOPE = $scope;

        $scope.lesson = Lessons.get({
            lessonId: $stateParams.lessonId
        });

        // Configuration for video container.
        $scope.config = {
            sources: [{
                src: $sce.trustAsResourceUrl("videos/big_buck_bunny.mp4"),
                type: "video/mp4"
            }, {
                src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"),
                type: "video/webm"
            }, {
                src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"),
                type: "video/ogg"
            }],
            tracks: [{
                src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                kind: "subtitles",
                srclang: "en",
                label: "English",
                default: ""
            }],
            theme: "lib/videogular-themes-default/videogular.css",
            plugins: {
                poster: "http://www.videogular.com/assets/images/videogular.png"
            },
            responsive: true,
            height: 380,
            width: 740
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
                $log.info('Modal dismissed at: ' + new Date());
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