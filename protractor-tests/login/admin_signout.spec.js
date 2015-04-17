// Generic page object -- interacts with header
var Page = function() {

	this.dropdown = function() {
		return element(by.id('profile_dropdown'))
		.element(by.className('dropdown'))
	}

	this.signout_btn = function() {
		return element(by.className('dropdown-menu'))
		.element(by.linkText('Signout'));
	}

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/');
	}

	this.signout = function() {
		// Have to click twice for some reason
		this.dropdown().click();
		this.signout_btn().click();
	}
}

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