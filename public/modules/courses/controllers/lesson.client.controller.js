'use strict';

angular.module('courses').controller('LectureController', ['$scope', '$sce', '$stateParams', '$modal', '$state', '$location', 'Lessons',
    function($scope, $sce, $stateParams, $modal, $state, $location, Lessons) {
        window.MY_SCOPE = $scope;

        Lessons.get({
            lessonId: $stateParams.lessonId
        }, function(response) {
            $scope.lesson = response;
        }, function(error) {
            $location.path('/error/lesson');
        });

        // Configuration for video container.
        $scope.config = {
            sources: [{
                src: $sce.trustAsResourceUrl("videos/big_buck_bunny.mp4"),
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