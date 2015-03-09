//Sign out

var MainPage = function() {
	// Page object for the sign in page
	
	// This code is already fairly readable
	// 'this' references this function, the SignInPage
	// These are items on the sign in page:
	var dropdown_toggle = element(by.css('li.dropdown > a.dropdown-toggle'));
	var signout_btn = element(by.linkText('Signout'));

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/');
	}
	this.signout = function() {
		// Have to click twice for some reason
		dropdown_toggle.click().click();
		signout_btn.click();
	}

};

describe('Signout', function() {
	it('Do signout', function() {
		var mainpage = new MainPage();
		mainpage.get();
		mainpage.signout();
	});
});