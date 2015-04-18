//Sign out

var Page = function() {
	// Page object for the sign in page
	
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

describe('Signout', function() {
	it('Do user signout', function() {
		var page = new Page();
		page.get();
		page.signout();
	});
});