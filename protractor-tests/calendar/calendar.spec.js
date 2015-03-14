// All of the calendar tests (for admin/instructor)

var CalendarPage = function() {

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/calendar');
	};

	this.getEvent = function(ind) {
		var events = element.all(by.repeater('event in events'));
		this.event_title = function() {
			return events[ind].element(by.tagName('h1')).getText();
		};
		this.event_date = function() {
			return events[ind].element(by.tagName('h4')).getText();
		};
		this.event_description = function() {
			return events[ind].element(by.tagName('p')).getText();
		};
		this.btnDelete = function() {
			return events[ind].element(by.css('[data-ng-click="remove(event)"]'));
		};
		return events[ind];
	};

	this.submit = function() {
		this.btnSubmit.click();
	}
	this.setEventName = function(name) {
		this.tbEventName.clear();
		this.tbEventName.sendKeys(name);
	}
	this.setEventDescription = function(description) {
		this.tbEventDescription.clear();
		this.tbEventDescription.sendKeys(description)
	}
	this.setDate = function(date) {
		this.tbDate.clear();
		this.tbDate.sendKeys(date);
	}
	this.toggleAMPM = function() {
		this.btnAMPM.click();
	}
	this.setHour = function(hour) {
		this.tbHour.clear();
		this.tbHour.sendKeys(hour);
	}
	this.setMinute = function(minute) {
		this.tbMinute.clear();
		this.tbMinute.sendKeys(minute);
	}

	this.tbEventName = element(by.model('event.title'));
	this.tbEventDescription = element(by.model('event.body'));
	this.btnSubmit = element(by.buttonText('Submit'));
	this.tbDate = element(by.model('dt'));
	this.tbHour = element(by.model('hours'));
	this.tbMinute = element(by.model('minutes'));
	this.btnAMPM = element(by.css('[ng-click="toggleMeridian()"]'));

};

describe('Simple event functionality', function() {
	describe('Add simple event', function() {
		var calendarPage = new CalendarPage();
		it('Initalize calendar testing', function(){
			calendarPage.get();
		});
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
			browser.sleep(2000);
		});
	});
});