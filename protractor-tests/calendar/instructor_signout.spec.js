//Instructor sign out
var Page = function() {
	
	this.dropdown_toggle = function() {
		return element(by.css('li.dropdown > a.dropdown-toggle'));
	};

	this.signout_btn = function() {
		return element(by.linkText('Signout'));
	};

	this.signout = function() {
		// Have to click twice for some reason
		this.dropdown_toggle().click().click();
		this.signout_btn().click();
	};
};

var page = new Page();
describe('Signout', function() {
	it('Do instructor signout', function() {
		page.signout();
	});
});