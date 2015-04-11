// All of the calendar tests (for admin/instructor)

var CalendarPage = function() {

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/calendar');
	};

	this.title = function(ind) {
		return element.all(by.repeater('event in events')).get(ind).element(by.tagName('h1')).getText();
	};

	this.date = function(ind) {
		return element.all(by.repeater('event in events')).get(ind).element(by.tagName('h4')).getText();
	};

	this.description = function(ind) {
		return element.all(by.repeater('event in events')).get(ind).element(by.tagName('p')).getText();
	};

	this.deleteEvent = function(ind) {
		element.all(by.repeater('event in events')).get(ind).element(by.buttonText('Delete')).click();
	};		

	this.submit = function() {
		this.btnSubmit().click();
	};

	this.setEventName = function(name) {
		this.tbEventName().clear();
		this.tbEventName().sendKeys(name);
	};

	this.setEventDescription = function(description) {
		this.tbEventDescription().clear();
		this.tbEventDescription().sendKeys(description)
	};

	this.setDate = function(date) {
		this.tbDate().clear();
		this.tbDate().sendKeys(date);
	};

	this.toggleAMPM = function() {
		this.btnAMPM().click();
	};

	this.setHour = function(hour) {
		this.tbHour().clear();
		this.tbHour().sendKeys(hour);
	};

	this.setMinute = function(minute) {
		this.tbMinute().clear();
		this.tbMinute().sendKeys(minute);
	};

	this.tbEventName = function() {
		return element(by.model('event.title'));
	};

	this.tbEventDescription = function() {
		return element(by.model('event.body'));
	};

	this.btnSubmit = function() {
		return element(by.buttonText('Submit'));
	};

	this.tbDate = function() {
		return element(by.model('dt'));
	};

	this.tbHour = function() {
		return element(by.model('hours'));
	};

	this.tbMinute = function() {
		return element(by.model('minutes'));
	};
	
	this.btnAMPM = function() {
		return element(by.css('[ng-click="toggleMeridian()"]'));
	};
};

var topEventName;
var topEventDescription;
var topEventDate;

describe('Simple event functionality', function() {
	var calendarPage = new CalendarPage();
	describe('Initalize calendar testing', function() {
		it('Get calendar page', function() {
			browser.waitForAngular();
			calendarPage.get();
		});
		it('Get top event properties', function() {
			topEventName = calendarPage.title(0);
			topEventDescription = calendarPage.description(0);
			topEventDate = calendarPage.date(0);
		});
	});
	describe('Adding simple event, earliest chronologically', function() {
		describe('Do event add', function() {
			it('Set name', function() {
				calendarPage.setEventName('Test Event Name');
			});
			it('Set description', function() {
				calendarPage.setEventDescription('Test event description.')
			});
			it('Set date', function(){
				calendarPage.setDate('January 22, 2012');
			});
			it('Set hour', function() {
				calendarPage.setHour('08');
			});
			it('Set minute', function() {
				calendarPage.setMinute('30');
			});
			it('Submit event', function(){
				calendarPage.submit();
			});
		});
		describe('Event0', function() {
			it('Sh- be named Test Event Name', function() {
				expect(
					calendarPage.title(0))
				.toBe('Test Event Name');
			});
			it('Sh- have date of Jan 22, 2012', function() {
				expect(
					calendarPage.date(0))
				.toBe('January 22, 2012');
			});
			it('Sh- have test description', function() {
				expect(
					calendarPage.description(0))
				.toBe('Test event description.\nDelete');
			});			
		});
		describe('Event1', function() {
			it('Sh- have pre-add event0 name', function() {
				expect(
					calendarPage.title(1))
				.toBe(topEventName);
			});
			it('Sh- have pre-add date', function() {
				expect(
					calendarPage.date(1))
				.toBe(topEventDate);
			});
			it('Sh- have pre-add description', function() {
				expect(
					calendarPage.description(1))
				.toBe(topEventDescription);
			});			
		});
	});
	describe('Delete simple event', function() {
		it('Do delete', function() {
			calendarPage.deleteEvent(0);
		});
		describe('Event0', function() {
			it('Sh- have pre-add event0 name', function() {
				expect(
					calendarPage.title(0))
				.toBe(topEventName);
			});
			it('Sh- have pre-add date', function() {
				expect(
					calendarPage.date(0))
				.toBe(topEventDate);
			});
			it('Sh- have pre-add description', function() {
				expect(
					calendarPage.description(0))
				.toBe(topEventDescription);
			});				
		});
	});
});