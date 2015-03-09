'use strict';

(function() {
	// Courses Controller Spec
	describe('Courses Controller Tests', function() {
		// Initialize global variables
		var CoursesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Courses controller.
			CoursesController = $controller('CoursesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Course object fetched from XHR', inject(function(Courses) {
			// Create sample Course using the Courses service
			var sampleCourse = new Courses({
				name: 'New Course'
			});

			// Create a sample Courses array that includes the new Course
			var sampleCourses = [sampleCourse];

			// Set GET response
			$httpBackend.expectGET('courses').respond(sampleCourses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.courses).toEqualData(sampleCourses);
		}));

		it('$scope.findOne() should create an array with one Course object fetched from XHR using a courseId URL parameter', inject(function(Courses) {
			// Define a sample Course object
			var sampleCourse = new Courses({
				name: 'New Course'
			});

			// Set the URL parameter
			$stateParams.courseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/courses\/([0-9a-fA-F]{24})$/).respond(sampleCourse);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.course).toEqualData(sampleCourse);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Courses) {
			// Create a sample Course object
			var sampleCoursePostData = new Courses({
				name: 'New Course'
			});

			// Create a sample Course response
			var sampleCourseResponse = new Courses({
				_id: '525cf20451979dea2c000001',
				name: 'New Course'
			});

			// Fixture mock form input values
			scope.name = 'New Course';

			// Set POST response
			$httpBackend.expectPOST('courses', sampleCoursePostData).respond(sampleCourseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Course was created
			expect($location.path()).toBe('/courses/' + sampleCourseResponse._id);
		}));

		it('$scope.update() should update a valid Course', inject(function(Courses) {
			// Define a sample Course put data
			var sampleCoursePutData = new Courses({
				_id: '525cf20451979dea2c000001',
				name: 'New Course'
			});

			// Mock Course in scope
			scope.course = sampleCoursePutData;

			// Set PUT response
			$httpBackend.expectPUT(/courses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/courses/' + sampleCoursePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid courseId and remove the Course from the scope', inject(function(Courses) {
			// Create new Course object
			var sampleCourse = new Courses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Courses array and include the Course
			scope.courses = [sampleCourse];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/courses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCourse);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.courses.length).toBe(0);
		}));
	});
}());