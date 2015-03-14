// All of the calendar tests (for admin/instructor)

var CalendarPage = function() {

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/calendar');
	};

	this.title = function(ind) {
		return element.all(by.repeater('event in events')).get(ind).element(by.tagName('h1'));
	};
	this.date = function(ind) {
		return element.all(by.repeater('event in events')).get(ind).element(by.tagName('h4'));
	};
	this.description = function(ind) {
		return element.all(by.repeater('event in events')).get(ind).element(by.tagName('p'));
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
			browser.waitForAngular();
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
	describe('Event 1', function() {
		var calendarPage = new CalendarPage();
		it('Sh- be named Test Event Name', function() {
			expect(
				calendarPage.title(0).getText())
			.toBe('Test Event Name');
		});
		it('Sh- have date of Jan 22, 2012', function() {
			expect(
				calendarPage.date(0).getText())
			.toBe('January 22, 2012');
		});
		it('Sh- have test description', function() {
			expect(
				calendarPage.description(0).getText())
			.toBe('Test event description.\nDelete');
		});
	});
	describe('Event 1', function() {
		var calendarPage = new CalendarPage();
		it('Sh- be named Test Event Name', function() {
			expect(
				calendarPage.title(1).getText())
			.toBe('Test Event Name');
		});
		it('Sh- have date of Jan 22, 2012', function() {
			expect(
				calendarPage.date(1).getText())
			.toBe('January 22, 2012');
		});
		it('Sh- have test description', function() {
			expect(
				calendarPage.description(1).getText())
			.toBe('Test event description.\nDelete');
		});
	});
	describe('Event 2', function() {
		var calendarPage = new CalendarPage();
		it('Sh- be named Barbeque', function() {
			expect(
				calendarPage.title(2).getText())
			.toBe('Barbeque');
		});
		it('Sh- have date of Mar 12, 2015', function() {
			expect(
				calendarPage.date(2).getText())
			.toBe('March 12, 2015');
		});
		it('Sh- have test description', function() {
			expect(
				calendarPage.description(2).getText())
			.toBe('We\'re making skewered lamb!\nDelete');
		});
	});
});