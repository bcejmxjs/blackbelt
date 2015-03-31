'use strict';

var courseApp = angular.module('courses');

courseApp.controller('CoursesController', ['$scope', '$stateParams', 'Authentication', 'Courses', '$modal', '$log', '$sce', '$location',

    function($scope, $stateParams, Authentication, Courses, $modal, $log, $sce, $location) {

        window.MY_SCOPE = $scope;

        this.authentication = Authentication;

        this.courses = Courses.query();

        // Open a modal window to Create a single course record
        this.modalCreate = function(size) {

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
        this.modalUpdate = function(size, selectedCourse) {

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
        this.modalRemove = function(size, selectedCourse) {

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
                location.reload();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        // Open a modal window to View a single course record
        this.modalView = function(size, selectedCourse) {
            $log.info(selectedCourse);
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


        $scope.purchaseCourse = function(addedCourseId) {
            //Update Authentication Object
            Authentication.user.coursesPurchased.push({courseId : addedCourseId});
            //Push Changes to DB
            Authentication.user.$save(function() {
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        }

    }

]);

courseApp.controller('CoursesCreateController', ['$scope', 'Courses', '$location',
    function($scope, Courses, $location) {

        // Create new Course
        this.create = function() {
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
                $scope.name = '';
                $scope.description = '';
                $scope.price = '';
                $scope.instructor = '';
                $scope.demo = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);

courseApp.controller('CoursesEditController', ['$scope', 'Courses',
    function($scope, Courses) {
        // Edit existing Course
        this.update = function(updatedCourse) {
            var course = updatedCourse;

            course.$update(function() {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);


courseApp.controller('CoursesRemoveController', ['$scope', 'Courses', '$location', 'Notify',
    function($scope, Courses, $location, Notify) {
        // Remove existing Course
        this.remove = function(course) {

            Notify.sendMsg('Oldcourse', {
                'id': course._id
            });

            if (course) {
                course.$remove();

                for (var i in $scope.courses) {
                    if ($scope.courses[i] === course) {
                        $scope.courses.splice(i, 1);
                    }
                }
            } else {
                course.$remove(function() {
                    $location.path('courses');
                });
            }
        };
    }
]);


courseApp.controller('CoursesViewController', ['$scope', 'Courses', '$stateParams',
    function($scope, Courses, $stateParams) {
        // View existing Course

        this.findOne = function() {
            $scope.course = Courses.get({
                courseId: $stateParams.courseId
            });
        };
    }
]);


// courseApp.controller('CoursesPurchaseController', ['$scope', 'Courses', 'User', '$stateParams','Authentication',
//     function($scope, Courses, User, $stateParams, Authentication) {
//          // User Purchases Course

//         this.purchaseCourse = function(purchaseCourse, purchaseUser) {
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


courseApp.directive('courseList', ['Courses', 'Notify', function(Courses, Notify) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/courses/views/course-list-template.html',
        link: function(scope, element, attrs) {

            // when a course is delete, update the course-list
            Notify.getMsg('Oldcourse', function(event, data) {
                scope.coursesCtrl.courses = Courses.query();
            })
        }
    };

}]);


//         $scope.authentication = Authentication;

//         // Create new Course
//         $scope.create = function() {
//             // Create new Course object
//             var course = new Courses({
//                 name: this.name,
//                 description: this.description,
//                 price: this.price,
//                 level: this.level,
//                 instructor: this.instructor
//             });

//             // Redirect after save
//             course.$save(function(response) {
//                 $location.path('courses/' + response._id);

//                 // Clear form fields
//                 $scope.name = '';
//                 $scope.description = '';
//                 $scope.price = '';
//                 $scope.level = '';
//                 $scope.instructor = '';
//             }, function(errorResponse) {
//                 $scope.error = errorResponse.data.message;
//             });
//         };

//         // Remove existing Course
//         $scope.remove = function(course) {
//             if (course) {
//                 course.$remove();

//                 for (var i in $scope.courses) {
//                     if ($scope.courses[i] === course) {
//                         $scope.courses.splice(i, 1);
//                     }
//                 }
//             } else {
//                 $scope.course.$remove(function() {
//                     $location.path('courses');
//                 });
//             }
//         };

//         // Update existing Course
//         $scope.update = function() {
//             var course = $scope.course;

//             course.$update(function() {
//                 $location.path('courses/' + course._id);
//             }, function(errorResponse) {
//                 $scope.error = errorResponse.data.message;
//             });
//         };

//         // Find a list of Courses
//         $scope.find = function() {
//             $scope.courses = Courses.query();
//         };

//         // Find existing Course
//         $scope.findOne = function() {
//             $scope.course = Courses.get({
//                 courseId: $stateParams.courseId
//             });
//         };
//     }
// ]);

//data-ng-href="#!/courses/{{course._id}}"