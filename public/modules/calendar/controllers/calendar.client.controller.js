'use strict';

angular.module('calendar').controller('CalendarController', ['$scope', '$state', '$location', 'Events', 'Authentication',
    function($scope, $state, $location, Events, Authentication) {
        /* Common Variables */

        // Provides Authentication context.
        $scope.authentication = Authentication;

        // Debug info for Chrome Dev Tools inspect the scope using MY_SCOPE!
        window.MY_SCOPE = $scope;

        // Binds moment function to scope.
        $scope.moment = moment;

        /* Begin Open/Closed Code */

        // TODO: Gets Hours for Different days from DB.
        // Define Open Days
        $scope.days = [{
            name: 'Sunday',
            isOpen: false
        }, {
            name: 'Monday',
            isOpen: true,
            openHour: 7,
            closeHour: 18
        }, {
            name: 'Tuesday',
            isOpen: true,
            openHour: 7,
            closeHour: 18
        }, {
            name: 'Wednesday',
            isOpen: true,
            openHour: 7,
            closeHour: 18
        }, {
            name: 'Thursday',
            isOpen: true,
            openHour: 7,
            closeHour: 18
        }, {
            name: 'Friday',
            isOpen: true,
            openHour: 7,
            closeHour: 18
        }, {
            name: 'Saturday',
            isOpen: false
        }];

        //Takes in a day number and returns the correct style for the given day.
        $scope.getDayStyle = function(dayIndex) {
            if (moment().day() === dayIndex)
                return {
                    'background': 'whitesmoke'
                };
            else
                return {};
        };

        //Determines currently open/closed status
        $scope.isCurrentlyOpen = function() {
            var day = $scope.days[moment().day()];
            if (day.isOpen &&
                moment().hour() >= day.openHour &&
                moment().hour() < day.closeHour
            )
                return true;
            else
                return false;
        };

        //Gets correct panel style to associate with being opened/closed.
        $scope.getOpenPanelClass = function() {
            if ($scope.isCurrentlyOpen())
                return 'panel-success';
            else
                return 'panel-danger';
        };

        //Gets correct panel TEXT to associate with being opened/closed.
        $scope.getOpenPanelText = function() {
            if ($scope.isCurrentlyOpen())
                return 'Currently Open';
            else
                return 'Currently Closed';
        };

        //converts the hour from 24 hour time, to a human readable form.
        $scope.hourFormat = function(hour) {
            if (hour < 12)
                return hour + ':00 AM';
            else if (hour == 24)
                return '12:00 AM';
            else if (hour > 12)
                return (hour - 12) + ':00 PM';
            else
                return '12:00 PM';
        };

        /* Begin Events Code */

        // Uses Events service to retrieve list of events.
        $scope.list = function() {
            $scope.events = Events.query();
        };

        $scope.create = function() {

            var datetime = new Date($scope.dt.getFullYear(), $scope.dt.getMonth(),
                $scope.dt.getDate(), $scope.mytime.getHours(),
                $scope.mytime.getMinutes(), $scope.mytime.getSeconds());

            var event = new Events({
                title: this.event.title,
                body: this.event.body,
                date: datetime
                    // Do something with the time and date to combine.
            });
            event.$save(function(response) {
                $state.reload();
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function(event) {
            if (event) {
                event.$remove();

                for (var i in $scope.events) {
                    if ($scope.events[i] === event) {
                        $scope.events.splice(i, 1);
                    }
                }
            } else {
                $scope.event.$remove(function() {
                    $location.path('calendar');
                });
            }
        };

        /* End Events Code */

        /*  Begin Date Picker Functions */
        $scope.format = 'MMMM dd, yyyy';

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        /* End Date Picker Functions */

        /* Begin Time Picker Functions */

        // Set default time to 12:00 PM
        var d = new Date();
        d.setHours(12);
        d.setMinutes(0);
        $scope.mytime = d;

        // Set the step for hours and minutes.
        $scope.hstep = 1;
        $scope.mstep = 30;

        // Allows for 12 hour time format.
        $scope.ismeridian = true;

        $scope.changed = function() {
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };
        /* End Time Picker Functions */
    }
]);