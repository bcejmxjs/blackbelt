'use strict';

(function() {
    // Authentication controller Spec
    describe('DashboardController', function() {
        // Initialize global variables
        var DashboardController,
            scope,
            $httpBackend,
            $stateParams,
            $location;

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

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Lessons) {
            // Set a new global scope
            scope = $rootScope.$new();

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;

            // Initialize the Dashboard controller
            DashboardController = $controller('DashboardController', {
                $scope: scope
            });
        }));
		describe('Tests .grabUsersCourses()', function(){
	        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Lessons, Courses) {
	            // Set a new global scope
	            scope = $rootScope.$new();

	            // Point global variables to injected services
	            $stateParams = _$stateParams_;
	            $httpBackend = _$httpBackend_;
	            $location = _$location_;

	            // Initialize the Dashboard controller
	            DashboardController = $controller('DashboardController', {
	                $scope: scope
	            });
				var sampleCourse1 = new Courses({
					name: 'Kenpō'
				});
				var sampleCourses = [sampleCourse1];
				scope.sampleCourses = sampleCourses;
				scope.authentication.user = {
					            firstName: 'Test',
					            lastName: 'McTesterson',
					            displayName: 'Testy McTesterson',
					            email: 'test@test.com',
					            roles: ['user'],
								coursesPurchased : [ { courseId : '5500abb9d21dec690fc66fe6', lessonsCompleted : [ '55177ecf960986f53e7ee773' ] } ]
				};
	        }));
        	it('$scope.grabUsersCourses() should have the same ID', inject(function() {
        	    scope.grabUsersCourses();
        	    expect(scope.courses[0]._id).toEqual(scope.sampleCourses[0]._id);
        	}));
        	it('$scope.grabUsersCourses() should have an array length of 1', inject(function() {
        	    scope.grabUsersCourses();
				expect(scope.courses.length).toEqual(1);
        	}));
        	it('$scope.grabUsersCourses() should not have another course in array', inject(function() {
        	    scope.grabUsersCourses();
        	    expect(scope.courses[1]).toBeUndefined();
        	}));
		});
		
		describe('Tests .getCourseProgress()', function(){
			beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Lessons, Courses){
				var sampleLesson1 = new Lessons({
					name: 'blocking',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson2 = new Lessons({
					name: 'kicking',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson3 = new Lessons({
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson4 = new Lessons({
					_id: '55177ecf960986f53e7ee774',
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe8'
				});
				var sampleLesson5 = new Lessons({
					_id: '55177ecf960986f53e7ee775',
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe9'
				});
				var sampleLesson6 = new Lessons({
					_id: '55177ecf960986f53e7ee776',
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe9'
				});
				var sampleLessons = [sampleLesson1, sampleLesson2, sampleLesson3, sampleLesson4, sampleLesson5, sampleLesson6];
				scope.lessons = sampleLessons;
				var sampleCourse1 = new Courses({
					_id:'5500abb9d21dec690fc66fe6',
					name: 'Started'
				});
				var sampleCourse2 = new Courses({
					_id:'5500abb9d21dec690fc66fe7',
					name: 'Blank'
				});
				var sampleCourse3 = new Courses({
					_id:'5500abb9d21dec690fc66fe8',
					name: 'Completed'
				});
				var sampleCourse4 = new Courses({
					_id:'5500abb9d21dec690fc66fe9',
					name: 'NotStarted'
				});
				var sampleCourses = [sampleCourse1, sampleCourse2, sampleCourse3, sampleCourse4];
				scope.sampleCourses = sampleCourses;
				scope.authentication.user = {
					            firstName: 'Test',
					            lastName: 'McTesterson',
					            displayName: 'Testy McTesterson',
					            email: 'test@test.com',
					            roles: ['user'],
								coursesPurchased : [ { courseId : '5500abb9d21dec690fc66fe6', lessonsCompleted : [ '55177ecf960986f53e7ee773' ] },
													{ courseId : '5500abb9d21dec690fc66fe7', lessonsCompleted : [ ] },
													{ courseId : '5500abb9d21dec690fc66fe8', lessonsCompleted : [ '55177ecf960986f53e7ee774' ] },
													{ courseId : '5500abb9d21dec690fc66fe9', lessonsCompleted : [ ] } ]
				};
			}));
			//Started Course Tests
        	it('$scope.getCourseProgress() should set the progBarText to right value of Started course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[0]);
        	    expect(scope.progBarText).toEqual('1 / 3 Completed');
        	}));
        	it('$scope.getCourseProgress() should set the progBarValue to right value of Started course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[0]);
				expect(scope.progBarValue).toEqual(33);
        	}));
        	it('$scope.getCourseProgress() should set the progBarType to right value of Started course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[0]);
				expect(scope.progBarType).toEqual('inprog');
        	}));
			//Blank Course Tests
        	it('$scope.getCourseProgress() should set the progBarText to right value of a Blank course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[1]);
        	    expect(scope.progBarText).toEqual('No lessons in this course at this time');
        	}));
        	it('$scope.getCourseProgress() should set the progBarValue to right value of a Blank course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[1]);
				expect(scope.progBarValue).toEqual(100);
        	}));
        	it('$scope.getCourseProgress() should set the progBarType to right value of a Blank course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[1]);
				expect(scope.progBarType).toEqual('null');
        	}));
			//Completed Course Tests
        	it('$scope.getCourseProgress() should set the progBarText to right value of Completed course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[2]);
        	    expect(scope.progBarText).toEqual('You have completed this course!');
        	}));
        	it('$scope.getCourseProgress() should set the progBarValue to right value of Completed course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[2]);
				expect(scope.progBarValue).toEqual(100);
        	}));
        	it('$scope.getCourseProgress() should set the progBarType to right value of Completed course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[2]);
				expect(scope.progBarType).toEqual('success');
        	}));
			//NotStarted Course Tests
        	it('$scope.getCourseProgress() should set the progBarText to right value of NotStarted course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[3]);
        	    expect(scope.progBarText).toEqual('You have not started this course.');
        	}));
        	it('$scope.getCourseProgress() should set the progBarValue to right value of NotStarted course under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[3]);
				expect(scope.progBarValue).toEqual(100);
        	}));
        	it('$scope.getCourseProgress() should set the progBarType to right value of NotStartedcourse under Test user', inject(function() {
        	    scope.getCourseProgress(scope.sampleCourses[3]);
				expect(scope.progBarType).toEqual('null');
        	}));
		});
		
		describe('Tests .getCourseProgress() low percent cases', function(){
			beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Lessons, Courses){
				var sampleLesson1 = new Lessons({
					name: 'blocking',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson2 = new Lessons({
					_id:'55177ecf960986f53e7ee774',
					name: 'kicking',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson3 = new Lessons({
					_id:'55177ecf960986f53e7ee775',
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson4 = new Lessons({
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson5 = new Lessons({
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson6 = new Lessons({
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson7 = new Lessons({
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson8 = new Lessons({
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson9 = new Lessons({
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson10 = new Lessons({
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLesson11 = new Lessons({
					name: 'punching',
					courseId: '5500abb9d21dec690fc66fe6'
				});
				var sampleLessons = [sampleLesson1, sampleLesson2, sampleLesson3, sampleLesson4, sampleLesson5, sampleLesson6, sampleLesson7, sampleLesson8, sampleLesson9, sampleLesson10, sampleLesson11];
				scope.lessons = sampleLessons;
				var sampleCourse1 = new Courses({
					_id:'5500abb9d21dec690fc66fe6',
					name: 'Started'
				});
				var sampleCourses = [sampleCourse1];
				scope.sampleCourses = sampleCourses;
			}));
			
			describe('Tests .getCourseProgress() <10% cases', function(){
				beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Lessons, Courses){
					scope.authentication.user = {
						            firstName: 'Test',
						            lastName: 'McTesterson',
						            displayName: 'Testy McTesterson',
						            email: 'test@test.com',
						            roles: ['user'],
									coursesPurchased : [ { courseId : '5500abb9d21dec690fc66fe6', lessonsCompleted : [ '55177ecf960986f53e7ee773' ] } ]
					};
				}));
				//Started Course Tests  <10% completion
        		it('$scope.getCourseProgress() should set the progBarText to right value of Started course under Test user <10% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
        		    expect(scope.progBarText).toBeUndefined();
        		}));
        		it('$scope.getCourseProgress() should set the progBarValue to right value of Started course under Test user <10% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
					expect(scope.progBarValue).toEqual(9);
        		}));
        		it('$scope.getCourseProgress() should set the progBarType to right value of Started course under Test user <10% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
					expect(scope.progBarType).toEqual('inprog');
        		}));
        		it('$scope.getCourseProgress() should set the $scope.percent to false of Started course under Test user <10% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
					expect(scope.percent).toEqual(false);
        		}));
			});
			describe('Tests .getCourseProgress() >=10% and <= 25% cases', function(){
				beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_){
					scope.authentication.user = {
						            firstName: 'Test',
						            lastName: 'McTesterson',
						            displayName: 'Testy McTesterson',
						            email: 'test@test.com',
						            roles: ['user'],
									coursesPurchased : [ { courseId : '5500abb9d21dec690fc66fe6', lessonsCompleted : [ '55177ecf960986f53e7ee773', '55177ecf960986f53e7ee774'] } ]
					};
				}));
				//Started Course Tests  >10% and <=25% completion
        		it('$scope.getCourseProgress() should set the progBarText to right value of Started course under Test user >=10% and <=25% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
        		    expect(scope.progBarText).toEqual('2 / 11');
        		}));
        		it('$scope.getCourseProgress() should set the progBarValue to right value of Started course under Test user >=10% and <=25% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
					expect(scope.progBarValue).toEqual(18);
        		}));
        		it('$scope.getCourseProgress() should set the progBarType to right value of Started course under Test user >=10% and <=25% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
					expect(scope.progBarType).toEqual('inprog');
        		}));
			});
			describe('Tests .getCourseProgress() > 25% cases', function(){
				beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_){
					scope.authentication.user = {
						            firstName: 'Test',
						            lastName: 'McTesterson',
						            displayName: 'Testy McTesterson',
						            email: 'test@test.com',
						            roles: ['user'],
									coursesPurchased : [ { courseId : '5500abb9d21dec690fc66fe6', lessonsCompleted : [ '55177ecf960986f53e7ee773', '55177ecf960986f53e7ee774', '55177ecf960986f53e7ee775'] } ]
					};
				}));
				//Started Course Tests >25% completion
        		it('$scope.getCourseProgress() should set the progBarText to right value of Started course under Test user >25% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
        		    expect(scope.progBarText).toEqual('3 / 11 Completed');
        		}));
        		it('$scope.getCourseProgress() should set the progBarValue to right value of Started course under Test user >25% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
					expect(scope.progBarValue).toEqual(27);
        		}));
        		it('$scope.getCourseProgress() should set the progBarType to right value of Started course under Test user >25% completion', inject(function() {
        		    scope.getCourseProgress(scope.sampleCourses[0]);
					expect(scope.progBarType).toEqual('inprog');
        		}));
			});
		});
		
    });
}());