// Generic page object -- interacts with header
var Page = function() {

	this.dropdown_toggle = function() {
		return element(by.css('li.dropdown > a.dropdown-toggle'));
	};

	this.signout_btn = function() {
		return element(by.linkText('Signout'));
	};

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/');
	};

	this.signout = function() {
		// Have to click twice for some reason
		this.dropdown_toggle().click().click();
		this.signout_btn().click();
	};
};

var page = new Page();
describe('Admin signout', function() {
	it('Do signout', function() {
		page.get();
		page.signout();
	});
	//--------------------------------------------------
	it('Sh- remain on the homepage', function() {
		expect(
			browser.getCurrentUrl())
		.toBe(browser.baseUrl + '/#!/');
	});
	//--------------------------------------------------
	it('Sh- allow access of signin page', function() {
		browser.get(browser.baseUrl + '/#!/signin');
		expect(
			browser.getCurrentUrl())
		.toBe(browser.baseUrl + '/#!/signin');
	});
});