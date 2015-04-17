var SignInPage = function() {
	// Page object for the sign in page

	this.username_field = function() {
		return element(by.id('username'));
	};

	this.password_field = function() {
		return element(by.id('password'));
	};

	this.signin_btn = function() {
		return element(by.id('signin'));
	};

	var user = {
		username: 'test',
		password: 'testuser'
	};

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/signin');
	}

	// Input custom text into the username field
	this.setUsername = function(username) {
		this.username_field().sendKeys(username);
	};

	// Input custom text into password field
	this.setPassword = function(password) {
		this.password_field().sendKeys(password);
	};

	// Login as user
	this.user_signin = function() {
		this.setUsername(user.username);
		this.setPassword(user.password);
		this.signin_btn().click();
	};

};

var signin = new  SignInPage();
describe('Basic user sign in', function() {
	it('Do basic user sign in', function() {
		signin.get();
		signin.user_signin();
	});
	//--------------------------------------------------
	it('Sh- redirect to the dashboard', function() {
		expect(
			browser.getCurrentUrl())
		.toBe(browser.baseUrl + '/#!/dashboard');
	});
	//--------------------------------------------------
	it('Sh- not allow access of sign in page', function() {
		browser.get(browser.baseUrl + '/#!/signin');
		expect(
			browser.getCurrentUrl())
		.toBe(browser.baseUrl + '/#!/');
	});
});