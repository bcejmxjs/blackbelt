'use strict';

(function() {
    // Calendar Controller Spec
    describe('Calendar Controller Tests', function() {
        // Initialize global variables
        var CalendarController,
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

            // Initialize the Calendar controller.
            CalendarController = $controller('CalendarController', {
                $scope: scope
            });
        }));

        /* Test Open/Close Functions */
		describe('Tests .hourFormat() method', function(){
        	it('Open/close hours properly formatted', inject(function() {
        	    expect(scope.hourFormat(18)).toBe('6:00 PM');
        	}));
        	
        	it('Assure midnight is properly formatted', inject(function() {
        	    expect(scope.hourFormat(24)).toBe('12:00 AM');
        	}));
        	
        	it('Assure noon is properly formatted', inject(function() {
        	    expect(scope.hourFormat(12)).toBe('12:00 PM');
        	}));
        	
        	it('Assure an AM time is properly formatted', inject(function() {
        	    expect(scope.hourFormat(2)).toBe('2:00 AM');
        	}));
        	
        	it('Assure an AM time is properly formatted', inject(function() {
        	    expect(scope.hourFormat(2)).toBe('2:00 AM');
        	}));
		});
		describe('Tests functions return values if it is open', function(){
	        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
				//redefine the value of days so that functions always work regardless of when test is ran
				scope.days=[
					{ name: 'Sunday', isOpen: true, openHour: 0, closeHour: 24 },
					{ name: 'Monday', isOpen: true, openHour: 0, closeHour: 24 }, 
					{ name: 'Tuesday', isOpen: true, openHour: 0, closeHour: 24 },
					{ name: 'Wednesday', isOpen: true, openHour: 0, closeHour: 24 }, 
					{ name: 'Thursday', isOpen: true, openHour: 0, closeHour: 24 },
					{ name: 'Friday', isOpen: true, openHour: 0, closeHour: 24 }, 
					{ name: 'Saturday', isOpen: true, openHour: 0, closeHour: 24 }
				];
	        }));
			it('Test .isCurrentlyOpen()', inject(function(){
				expect(scope.isCurrentlyOpen()).toBe(true);
			}));
			it('Test .getDayStyle()', inject(function(){
				expect(scope.getDayStyle(moment().day())).toEqual({ background : 'whitesmoke' });
			}));
			it('Test .getOpenPanelClass()', inject(function(){
				expect(scope.getOpenPanelClass()).toBe('panel-success');
			}));
			it('Test .getOpenPanelText()', inject(function(){
				expect(scope.getOpenPanelText()).toBe('Currently Open');
			}));
		});
		describe('Tests functions return values if it is closed', function(){
	        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
				//redefine the value of days so that functions always work regardless of when test is ran
				scope.days=[
					{ name: 'Sunday', isOpen: false },
					{ name: 'Monday', isOpen: false }, 
					{ name: 'Tuesday', isOpen: false },
					{ name: 'Wednesday', isOpen: false }, 
					{ name: 'Thursday', isOpen: false },
					{ name: 'Friday', isOpen: false }, 
					{ name: 'Saturday', isOpen: false }
				];
	        }));
			it('Test .isCurrentlyOpen()', inject(function(){
				expect(scope.isCurrentlyOpen()).toBe(false);
			}));
			it('Test .getDayStyle()', inject(function(){
				expect(scope.getDayStyle(moment().add(1, 'days').day())).toEqual({ });
			}));
			it('Test .getOpenPanelClass()', inject(function(){
				expect(scope.getOpenPanelClass()).toBe('panel-danger');
			}));
			it('Test .getOpenPanelText()', inject(function(){
				expect(scope.getOpenPanelText()).toBe('Currently Closed');
			}));
		});
    });
}());