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

        it('Open/close hours properly formatted', inject(function() {
            expect(scope.hourFormat(18)).toBe('6:00 PM');
        }));

        it('Assure midnight is properly formatted', inject(function() {
            expect(scope.hourFormat(24)).toBe('12:00 AM');
        }));

        it('Assure noon is properly formatted', inject(function() {
            expect(scope.hourFormat(12)).toBe('12:00 PM');
        }));
    });
}());