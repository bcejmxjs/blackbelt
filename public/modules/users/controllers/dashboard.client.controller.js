'use strict';

angular.module('users').controller('DashboardController', ['$scope', '$http', '$location', '$state', 'Users', 'Authentication', 'Courses', 'Lessons', 'Submissions', 'Messages',
    function($scope, $http, $location, $state, Users, Authentication, Courses, Lessons, Submissions, Messages) {
        $scope.authentication = Authentication;

        // Debug info for Chrome Dev Tools inspect the scope using MY_SCOPE!
        window.MY_SCOPE = $scope;

        // If user is not signed in then redirect back home
        if (!Authentication.user) $location.path('/');

        $scope.courses = [];

        $scope.submissionsList = function() {
            $scope.submissions = Submissions.query();
        };

        $scope.messagesList = function() {
            $scope.messages = Messages.getMessages({
                recipientId: Authentication.user._id
            });
        };

        $scope.grabUsersCourses = function() {
            for (var i = 0; i < Authentication.user.coursesPurchased.length; i++) {
                this.courses.push(
                    Courses.get({
                        courseId: Authentication.user.coursesPurchased[i].courseId
                    })
                );
            }
        };

        $scope.lessons = [];

        $scope.getAllLessons = function() {
            $scope.lessons = Lessons.getAll();
        };

        // Formats title of message body.
        var formatTitle = function(decision) {
            var decisionText = ' denied ';
            if (decision) {
                decisionText = ' accepted ';
            }
            return Authentication.user.displayName + decisionText + 'your submission.';
        };

        $scope.pass = function(submission) {
            var decision = true;
            $scope.createMessage(submission, decision);
        };

        $scope.fail = function(submission) {
            var decision = false;
            $scope.createMessage(submission, decision);
        };

        $scope.createMessage = function(submission, decision, body) {
            var message = new Messages({
                recipientId: submission.userId,
                senderId: Authentication.user._id,
                submissionId: submission._id,
                title: formatTitle(decision),
                body: submission.body,
                read: false
            });

            message.$save(function(response) {
                // $location.path('course/' + +$stateParams.courseId);
                submission.$delete();
                $state.reload();

                // Clear form fields
                submission.body = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.readMessage = function(message) {
            message.$delete();
            $state.reload();
        };

        $scope.getCourseProgress = function(course) {
            var percentCompleted = 100;
            var progBarText;
            // Get number of lessons for a particular course.
            var lessonCount = 0;
            var i = 0;
            for (i = 0; i < $scope.lessons.length; i++) {
                if ($scope.lessons[i].courseId == course._id) {
                    lessonCount++;
                }
            }

            // Get number of lessons completed for this particular course.
            var lessonsCompleted = 0;
            if (Authentication.user.coursesPurchased) {
                for (i = 0; i < Authentication.user.coursesPurchased.length; i++) {
                    if (Authentication.user.coursesPurchased[i].courseId == course._id) {
                        lessonsCompleted = Authentication.user.coursesPurchased[i].lessonsCompleted.length;
                    }
                }
            }
            var progBarType;
            $scope.percent = true;
            if (lessonCount > 0) {
                progBarType = 'inprog';
                percentCompleted = Math.round((lessonsCompleted / lessonCount) * 100);
                if (percentCompleted >= 100) {
                    percentCompleted = 100;
                    progBarText = 'You have completed this course!';
                    progBarType = 'success';
                } else if (percentCompleted > 25 && percentCompleted < 100) {
                    progBarText = lessonsCompleted + ' / ' + lessonCount + ' Completed';
                } else if (percentCompleted >= 10 && percentCompleted <= 25) {
                    progBarText = lessonsCompleted + ' / ' + lessonCount;
                } else if (percentCompleted == 0) {
                    percentCompleted = 100;
                    progBarText = 'You have not started this course.';
                    progBarType = 'null';
                } else {
                    $scope.percent = false;
                }
            } else {
                progBarText = 'No lessons in this course at this time';
                progBarType = 'null';
            }
            //Set Scope Variables
            $scope.progBarText = progBarText;
            $scope.progBarValue = percentCompleted;
            $scope.progBarType = progBarType;
        };
    }
]);