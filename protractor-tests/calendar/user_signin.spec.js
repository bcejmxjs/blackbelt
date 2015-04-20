// Signin as basic user

var user = {
	username: 'test',
	password: 'testuser'
}

describe('Signin as user', function() {
	it('Do signin', function() {
		browser.get(browser.baseUrl + '/#!/signin');
		element(by.id('username')).sendKeys(user.username);
		element(by.id('password')).sendKeys(user.password);
		element(by.id('signin')).click();
	});
});