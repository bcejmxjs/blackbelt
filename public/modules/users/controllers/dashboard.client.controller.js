'use strict';

angular.module('users').controller('DashboardController', ['$scope', '$http', '$location', '$state', '$log', 'Users', 'Authentication', 'Courses', 'Lessons', 'Submissions', 'Messages',
    function($scope, $http, $location, $state, $log, Users, Authentication, Courses, Lessons, Submissions, Messages) {
        $scope.authentication = Authentication;

        // Debug info for Chrome Dev Tools inspect the scope using MY_SCOPE!
        window.MY_SCOPE = $scope;

        // If user is not signed in then redirect back home
        if (!Authentication.user) $location.path('/');

        $scope.courses = [];
        $scope.lessons = [];

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

        $scope.getAllLessons = function() {
            $scope.lessons = Lessons.getAll();
        };

        $scope.usersList = function() {
            $scope.users = Users.query();
        };

        // Formats title of message body.
        var formatTitle = function(decision) {
            var decisionText = ' denied ';
            if (decision) {
                decisionText = ' accepted ';
            }
            return Authentication.user.displayName + decisionText + 'your submission.';
        };

        // Passing feedback function
        $scope.pass = function(submission) {
            var decision = true;
            $scope.createMessage(submission, decision);
        };

        // Failing feedback function
        $scope.fail = function(submission) {
            var decision = false;
            $scope.createMessage(submission, decision);
        };

        // Creates a new message upon sending feedback
        $scope.createMessage = function(submission, decision, body) {
            var message = new Messages({
                recipientId: submission.userId,
                senderId: Authentication.user._id,
                submissionId: submission._id,
                title: formatTitle(decision),
                body: submission.body,
                decision: decision
            });

            message.$save(function(response) {
                // $location.path('course/' + +$stateParams.courseId);
                submission.reviewed = true;
                submission.$update(function() {
                    $state.reload();
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });

                // Clear form fields
                submission.body = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Reads message, removing it from notifications and
        // updating lessonsCompleted
        $scope.readMessage = function(message) {
            if (message.decision) {
                var msgSubmission = Submissions.get({
                    submissionId: message.submissionId
                }, function(msgSubmission) {
                    // Update coursesPurchased
                    var lessonsCompleted = 0;
                    for (var i = 0; i < Authentication.user.coursesPurchased.length; i++) {
                        if (Authentication.user.coursesPurchased[i].courseId == msgSubmission.courseId) {
                            Authentication.user.coursesPurchased[i].lessonsCompleted
                                .push(msgSubmission.lessonId);
                            Authentication.user.coursesPurchased[i].lessonPending = '';
                            lessonsCompleted = Authentication.user.coursesPurchased[i].lessonsCompleted.length;
                        }
                    }

                    var lessonCount = 0;
                    $scope.lessons.forEach(function(lesson) {
                        if (lesson.courseId == msgSubmission.courseId) {
                            lessonCount++;
                        }
                    });

                    if (lessonCount == lessonsCompleted) {
                        Courses.get({
                            courseId: msgSubmission.courseId
                        }, function(response) {
                            if (!Authentication.user.belts.length) {
                                Authentication.user.belts.push({
                                    color: response.belt.color,
                                    style: response.style
                                });
                            } else {
                                var found = false;
                                Authentication.user.belts.forEach(function(belt, index, belts) {
                                    if (belt.style == response.style) {
                                        found = true;
                                        belts[index].color = response.color;
                                    }
                                });
                                if (!found) {
                                    Authentication.user.belts.push({
                                        color: response.belt.color,
                                        style: response.style
                                    });
                                }
                            }
                            // Save those updates to the db!
                            var user = new Users($scope.authentication.user);
                            user.$update(function(response) {
                                $scope.success = true;
                                Authentication.user = response;
                            }, function(response) {
                                $scope.error = response.data.message;
                            });
                        });
                    } else {
                        // Save those updates to the db!
                        var user = new Users($scope.authentication.user);
                        user.$update(function(response) {
                            $scope.success = true;
                            Authentication.user = response;
                        }, function(response) {
                            $scope.error = response.data.message;
                        });
                    }
                });
            }
            // Remove the message and reload the state.
            message.$delete();
            $state.reload();
        };

        // Progress bar logic.
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