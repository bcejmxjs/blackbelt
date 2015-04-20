var instructor = {
	username: 'instructor',
	password: 'instructoruser'
}

describe('Signin as instructor', function() {
	it('Do signin', function() {
		browser.get(browser.baseUrl + '/#!/signin');
		element(by.id('username')).sendKeys(instructor.username);
		element(by.id('password')).sendKeys(instructor.password);
		element(by.id('signin')).click();
	});
});