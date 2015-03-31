'use strict';

angular.module('courses').controller('LectureController', ['$scope', '$sce', '$stateParams', 'Lessons',
    function($scope, $sce, $stateParams, Lessons) {
        window.MY_SCOPE = $scope;

        $scope.lesson = Lessons.get({
            lessonId: $stateParams.lessonId
        });

        // Lecture controller logic
        // ...
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
    }
]);