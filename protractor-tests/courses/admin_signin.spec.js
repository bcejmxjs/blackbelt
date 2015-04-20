var admin = {
	username: 'admin',
	password: 'adminuser'
}

describe('Signin as admin', function() {
	it('Do signin', function() {
		browser.get(browser.baseUrl + '/#!/signin');
		element(by.id('username')).sendKeys(admin.username);
		element(by.id('password')).sendKeys(admin.password);
		element(by.id('signin')).click();
	});
});