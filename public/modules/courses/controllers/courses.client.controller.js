'use strict';

var courseApp = angular.module('courses');

courseApp.controller('CoursesController', ['$scope', '$stateParams', 'Authentication', 'Courses', '$modal', '$log', '$sce',
   
    function($scope, $stateParams, Authentication, Courses, $modal, $log, $sce) {
        
        this.authentication = Authentication;
         
        this.courses = Courses.query();
    
        // Open a modal window to Create a single course record
        this.modalCreate = function (size) {

             var modalInstance = $modal.open({
               //  templateUrl: 'modules/courses/views/create-course.client.view.html',
                controller: ModalCreateCtrl,
                size: size,
             });

            modalInstance.result.then(function (selectedItem) {
    
            }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
         
        };


        var ModalCreateCtrl = function ($scope, $modalInstance){
            
              $scope.ok = function () {
                $modalInstance.close();
              };

              $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };
        };

        // Open a modal window to update a single course record
        this.modalUpdate = function (size, selectedCourse) {

             var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/edit-course.client.view.html',
                controller: ModalUpdateCtrl,
                size: size,
                resolve: {
                    course: function () {
                        return selectedCourse;
                    }
                 }
             });

            modalInstance.result.then(function (selectedItem) {
             $scope.selected = selectedItem;
            }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
         
        };


        var ModalUpdateCtrl = function ($scope, $modalInstance, course){
             $scope.course = course;

              $scope.ok = function () {
                $modalInstance.close($scope.course);
              };

              $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };
        };

         // Open a modal window to Remove a single course record
        this.modalRemove = function (size, selectedCourse) {

             var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/remove-course.client.view.html',
                controller: ModalRemoveCtrl,
                size: size,
                resolve: {
                    course: function () {
                        return selectedCourse;
                    }
                 }
             });

            modalInstance.result.then(function (selectedItem) {
             $scope.selected = selectedItem;
            }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
         
        };


        var ModalRemoveCtrl = function ($scope, $modalInstance, course){
             $scope.course = course;

              $scope.ok = function () {
                $modalInstance.close($scope.course);
              };

              $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };
        };

       // Open a modal window to View a single course record
        this.modalView = function (size, selectedCourse) {

             var modalInstance = $modal.open({
                templateUrl: 'modules/courses/views/view-course.client.view.html',
                controller: ModalViewCtrl,
                size: size,
                resolve: {
                    course: function () {
                        return selectedCourse;
                    }
                 }
             });

            modalInstance.result.then(function (selectedItem) {
             $scope.selected = selectedItem;
            }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
         
        };


        var ModalViewCtrl = function ($scope, $modalInstance, course){
             $scope.course = course;

              $scope.ok = function () {
                $modalInstance.close($scope.course);
              };

              $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };
        };


        
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
                level: this.level,
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
                $scope.level = '';
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


courseApp.controller('CoursesRemoveController', ['$scope', 'Courses','$location',
    function($scope, Courses, $location) {
         // Remove existing Course
        this.remove = function(course) {
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