//User sign out
var Page = function() {
	
	this.dropdown = function() {
		return element(by.id('profile_dropdown'))
		.element(by.className('dropdown'))
	}

	this.signout_btn = function() {
		return element.all(by.className('dropdown-menu'))
		.get(0)
		.element(by.linkText('Signout'));
	}

	this.signout = function() {
		this.dropdown().click();
		this.signout_btn().click();
	}
}

var page = new Page();
describe('Signout', function() {
	it('Do user signout', function() {
		page.signout();
	});
});