'use strict';

angular.module('calendar').controller('CalendarController', ['$scope', 'Events',
    function($scope, Events) {
		// Calendar controller logic

        // Debug info for Chrome Dev Tools inspect the scope using MY_SCOPE!
        window.MY_SCOPE = $scope;
        
		/* Common Variables */
        $scope.moment = moment;

        /* Begin Open/Closed Code */

        //TODO Gets Hours for Different days from DB.
        //Define Open Days
    	$scope.days = [
        	{name:'Sunday', isOpen:false},
        	{name:'Monday', isOpen:true, openHour:7, closeHour:18},
        	{name:'Tuesday', isOpen:true, openHour:7, closeHour:18},
        	{name:'Wednesday', isOpen:true, openHour:7, closeHour:18},
        	{name:'Thursday', isOpen:true, openHour:7, closeHour:18},
        	{name:'Friday', isOpen:true, openHour:7, closeHour:18},
        	{name:'Saturday', isOpen:false}
    	];

    	//Takes in a day number and returns the correct style for the given day.
    	$scope.getDayStyle = function( dayIndex )
    	{
    		if( moment().day() === dayIndex )
    			return {'background':'whitesmoke'};
    		else 
    			return {};
    	};

    	//Determines currently open/closed status
    	$scope.isCurrentlyOpen = function()
    	{
    		var day = $scope.days[moment().day()];
    		if( day.isOpen && 
    			moment().hour() >= day.openHour && 
    			moment().hour() < day.closeHour 
    			)
    			return true;
    		else 
    			return false;
    	};

    	//Gets correct panel style to associate with being opened/closed.
    	$scope.getOpenPanelClass = function()
    	{
    		if( $scope.isCurrentlyOpen() )
    			return 'panel-success';
    		else
    			return 'panel-danger';

    	};

    	//Gets correct panel TEXT to associate with being opened/closed.
    	$scope.getOpenPanelText = function()
    	{
    		if( $scope.isCurrentlyOpen() )
    			return 'Currently Open';
    		else
    			return 'Currently Closed';
    	};

        //converts the hour from 24 hour time, to a human readable form.
        $scope.hourFormat = function( hour )
        {
        	if( hour < 12 )
        		return hour + ':00 AM';
        	else if ( hour > 12 )
        		return (hour - 12) + ':00 PM';
            else
                return '12:00 PM';
        };        

        /* Begin Events Code */

        $scope.list = function() {
            $scope.events = Events.query();
        };
	}
]);
