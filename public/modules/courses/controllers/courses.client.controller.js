'use strict';

var courseApp = angular.module('courses');

courseApp.controller('CoursesController', ['$scope', '$stateParams', 'Authentication', 'Courses', '$modal', '$log',
    function($scope, $stateParams, Authentication, Courses, $modal, $log) {
        
        this.authentication = Authentication;

         
        this.courses = Courses.query();

        // Open a modal window to update a single customer record
        this.modalUpdate = function (size, selectedCourse) {

             var modalInstance = $modal.open({
                 templateUrl: 'modules/courses/views/edit-course.client.view.html',
                controller: ModalInstanceCtrl,
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


        var ModalInstanceCtrl = function ($scope, $modalInstance, course){
             $scope.course = course;
        }



        
   }    

]);      

courseApp.controller('CoursesCreateController', ['$scope', 'Courses',
    function($scope, Courses) {

   }
]);  

courseApp.controller('CoursesEditController', ['$scope', 'Courses',
    function($scope, Courses) {

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