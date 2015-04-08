'use strict';

angular.module('courses').controller('CoursesController', ['$scope', '$stateParams', 'Authentication', 'Users', 'Courses', '$modal', '$log', '$sce', '$location', '$state',
    function($scope, $stateParams, Authentication, Users, Courses, $modal, $log, $sce, $location, $state) {
        // Allows us to debug scope using dev tools.
        window.MY_SCOPE = $scope;

        $scope.authentication = Authentication;

        $scope.find = function() {
            $scope.courses = Courses.query();
        };

        // Redirect's users trying to access the create page back to Courses.
        $scope.redirect = function() {
            if (!Authentication.user) {
                $location.path('/courses');
            } else if (Authentication.user.roles.indexOf('admin') == -1) {
                $location.path('/courses');
            }
        };

        // Open a modal window to create a single course record
        $scope.modalCreate = function(size) {

            var modalInstance = $modal.open({
                //  templateUrl: 'modules/courses/views/create-course.client.view.html',
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
        $scope.modalUpdate = function(size, selectedCourse) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/course-edit.client.view.html',
                controller: ModalUpdateCtrl,
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

        var ModalUpdateCtrl = function($scope, $modalInstance, course) {
            $scope.course = course;

            $scope.ok = function() {
                $modalInstance.close($scope.course);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        // Open a modal window to Remove a single course record
        $scope.modalRemove = function(size, selectedCourse) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/course-remove.client.view.html',
                controller: ModalRemoveCtrl,
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

        var ModalRemoveCtrl = function($scope, $modalInstance, course) {
            $scope.course = course;

            $scope.ok = function() {
                $modalInstance.close($scope.course);
                $state.reload();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        // Open a modal window to View a single course record
        $scope.modalView = function(size, selectedCourse) {

            var modalFlag = true;

            if (Authentication.user) {
                if (Authentication.user.roles.indexOf('instructor') > -1 ||
                    Authentication.user.roles.indexOf('admin') > -1) {
                    modalFlag = false;
                    $location.path('course/' + selectedCourse._id);
                } else {
                    for (var i = 0; i < Authentication.user.coursesPurchased.length; i++) {
                        if (Authentication.user.coursesPurchased[i].courseId == selectedCourse._id) {
                            modalFlag = false;
                            $location.path('course/' + selectedCourse._id);
                        }
                    }
                }
            }
            if (modalFlag) {
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
            }
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

        // Dummy purchase when clicking on the purchase button.
        $scope.purchaseCourse = function(addedCourseId) {
            if (Authentication.user === '') {
                $location.path('/signin');
            }

            // Update Authentication Object
            Authentication.user.coursesPurchased.push({
                courseId: addedCourseId
            });

            var user = new Users(Authentication.user);

            // Push Changes to DB
            user.$update(function(response) {
                $scope.success = true;
                Authentication.user = response;
            }, function(response) {
                $scope.error = response.data.message;
            });
        };

        // Check to see if a course has already been purchased.
        $scope.isCoursePurchased = function(purchasedCourseId) {
            if (Authentication.user === '') {
                return false;
            }
            for (var a = 0; a != Authentication.user.coursesPurchased.length; a++) {
                if (Authentication.user.coursesPurchased[a].courseId == purchasedCourseId) {
                    return true;
                }
            }
            return false;
        };

        // Create new Course
        $scope.create = function() {
            // Create new Course object
            var course = new Courses({
                name: this.name,
                description: this.description,
                price: this.price,
                instructor: this.instructor,
                demo: this.demo
            });

            // Redirect after save
            course.$save(function(response) {
                $location.path('courses');

                // Clear form fields
                this.name = '';
                this.description = '';
                this.price = '';
                this.instructor = '';
                this.demo = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.update = function(updatedCourse) {
            var course = updatedCourse;

            course.$update(function() {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Course
        $scope.remove = function(course) {
            if (course) {
                course.$remove();
            } else {
                course.$remove(function() {
                    $location.path('courses');
                });
            }
        };

        $scope.findOne = function() {
            $scope.course = Courses.get({
                courseId: $stateParams.courseId
            });
        };
    }
]);

// courseApp.controller('CoursesPurchaseController', ['$scope', 'Courses', 'User', '$stateParams','Authentication',
//     function($scope, Courses, User, $stateParams, Authentication) {
//          // User Purchases Course
//         $scope.purchaseCourse = function(purchaseCourse, purchaseUser) {
//            var course = purchaseCourse;
//            var user = purchaseUser;
//             $scope.course = Courses.get({
//                 courseId: $stateParams.courseId
//             });
//             $scope.user = User.get({
//                 userId: $stateParams.userId
//             });
//         };
//    }
// ]);