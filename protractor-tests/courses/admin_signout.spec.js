//Sign out

var Page = function() {
	// Page object for the sign in page
	
	this.dropdown_toggle = function() {
		return element(by.css('li.dropdown > a.dropdown-toggle'));
	}
	
	this.signout_btn = function() {
		return element(by.linkText('Signout'));
	}

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/');
	}

	this.signout = function() {
		// Have to click twice for some reason
		this.dropdown_toggle().click().click();
		this.signout_btn().click();
	}

};

describe('Signout', function() {
	it('Do admin signout', function() {
		var page = new Page();
		page.get();
		page.signout();
	});
});