describe('User signout', function() {
	it('Perform signout', function() {
		// Click dropdown button
		element(by.id('profile_dropdown'))
		.element(by.className('dropdown')).click();
		// Click signout
		element(by.className('dropdown-menu'))
		.element(by.linkText('Signout')).click();
	});
});