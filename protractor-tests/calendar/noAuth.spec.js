// User calendar tests

var CalendarPage = function() {

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/calendar');
	}

	this.addEventStuff = function() {
		return element.all(by.className('panel-body'))
		.get(0);
	}

	this.btnDelete_event = function(ind) {
		return element.all(by.repeater('event in events'))
		.get(ind).element(by.buttonText('Delete'));
	}

	this.title = function(ind) {
		return element.all(by.repeater('event in events')).get(ind).element(by.tagName('h1')).getText();
	}

	this.date = function(ind) {
		return element.all(by.repeater('event in events')).get(ind).element(by.tagName('h4')).getText();
	}

	this.description = function(ind) {
		return element.all(by.repeater('event in events')).get(ind).element(by.tagName('p')).getText();
	}	
}

describe('As a basic user', function() {
	var calendarPage = new CalendarPage();
	describe('Initalize calendar testing', function() {
		it('Get calendar page', function() {
			browser.waitForAngular();
			calendarPage.get();
		});
	});
	describe('A user on calendar page', function() {
		//These tests are just to see if title/date/desc are accessible
		it('Sh- be able to access event0 title', function() {
			expect(
				calendarPage.title(0))
			.toBe(calendarPage.title(0));
		});
		it('Sh- be able to access event0 date', function() {
			expect(
				calendarPage.date(0))
			.toBe(calendarPage.date(0));
		});
		it('Sh- be able to access event0 description', function() {
			expect(
				calendarPage.description(0))
			.toBe(calendarPage.description(0));
		});
		it('Sh- not be able to see event adding fields', function() {
			expect(
				calendarPage.addEventStuff()
				.isDisplayed())
			.toBeFalsy();
		});
		it('Sh- not be able to see event delete button', function() {
			expect(
				calendarPage.btnDelete_event(0)
				.isDisplayed())
			.toBeFalsy();
		});
	});
});